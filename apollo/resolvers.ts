import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
import { transport, makeANiceEmail } from './mail'
import { hasPermission } from './utils'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
  typescript: true,
})

import { Context, UserInput, ItemInput, Pagination, CartItem } from './types'

export const resolvers = {
  Query: {
    async allItems(_parent: any, args: { searchTerm: string }, { prisma }: Context) {
      const allItems = await prisma.item.findMany({
        where: {
          OR: [
            {
              title: {
                contains: args.searchTerm,
              },
            },
            {
              description: {
                contains: args.searchTerm,
              },
            },
          ],
        },
      })
      return Array.isArray(allItems) ? allItems : []
    },
    async items(_: any, { offset = 0, limit = 4 }: Pagination, { prisma }: Context) {
      const allItems = await prisma.item.findMany()
      allItems.reverse()

      const total = allItems.length
      const items = allItems.slice(offset, offset + limit)
      const hasMore = allItems.length > offset + limit

      return {
        total,
        hasMore,
        items,
      }
    },
    async item(_: any, { id }: { id: string }, { prisma }: Context) {
      return prisma.item.findOne({ where: { id } })
    },
    user(_: any, __: null, { user }: Context) {
      if (user) {
        return user
      }
      return null
    },
    users(_: any, __: null, { prisma }: Context) {
      return prisma.user.findMany()
    },
    async order(_: any, { id }: { id: string }, { prisma }: Context) {
      const order = await prisma.order.findOne({
        where: { id },
        include: { user: true, items: true },
      })
      return order
    },
    async orders(_: any, __: null, { user, prisma }: Context) {
      return prisma.order.findMany({
        where: { userId: user.id },
        include: { items: true },
      })
    },
  },
  Mutation: {
    async createItem(_: any, args: ItemInput, { prisma, user }: Context) {
      if (!user) {
        throw new Error('You must be logged in to do that!')
      }
      const item = await prisma.item.create({
        data: {
          ...args,
          user: {
            connect: { id: user.id },
          },
        },
      })
      return item
    },
    async updateItem(_: any, args: ItemInput, { prisma }: Context) {
      // first take a copy of the updates
      const updates = { ...args }
      // remove the ID from the updates
      // TODO: fix delete operand must be optional error
      // delete updates.id
      // run the update method
      return prisma.item.update({
        data: updates,
        where: { id: args.id },
      })
    },
    async deleteItem(_: any, { id }: { id: string }, { prisma, user }: Context) {
      const where = { id }
      // 1. find the item
      const item = await prisma.item.findOne({ where })
      if (!item) {
        throw new Error('Item does not exist')
      }
      // 2. Check if they own that item, or have the permissions
      const ownsItem = item.userId === user.id
      const hasPermissions = user.permissions.some((permission: string) =>
        ['ADMIN', 'ITEMDELETE'].includes(permission)
      )

      if (!ownsItem && !hasPermissions) {
        throw new Error("You don't have permission to do that!")
      }

      // 3. Delete it!
      return prisma.item.delete({ where })
    },
    async signup(_: any, { email, password, name }: UserInput, { res, prisma }: Context) {
      const user = await prisma.user.create({
        data: {
          email: email.toLocaleLowerCase(),
          name,
          password: await bcrypt.hash(password, 10),
          permissions: { set: ['USER', 'ITEMCREATE', 'ITEMDELETE', 'ITEMUPDATE'] },
        },
      })
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET as string)
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
      })
      return user
    },
    async signin(_: any, { email, password }: UserInput, { res, prisma }: Context) {
      // 1. check if there is a user with that email
      const user = await prisma.user.findOne({ where: { email } })
      if (!user) {
        throw new Error(`No such user found for email ${email}`)
      }
      // 2. Check if their password is correct
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        throw new Error('Invalid Password!')
      }
      // 3. generate the JWT Token
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET as string)
      // 4. Set the cookie with the token
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      })
      // 5. Return the user
      return user
    },
    signout(_: any, __: any, { res }: Context) {
      res.clearCookie('token')
      return null
    },
    async requestReset(_: any, { email }: { email: string }, { prisma }: Context) {
      const user = await prisma.user.findOne({ where: { email } })
      if (!user) {
        throw new Error(`No user found for email: ${email}'`)
      }
      const randomBytesPromiseified = promisify(randomBytes)
      const resetToken = (await randomBytesPromiseified(20)).toString('hex')
      const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now
      await prisma.user.update({
        where: { email },
        data: { resetToken, resetTokenExpiry },
      })
      await transport.sendMail({
        from: 'dave@bos.com',
        to: user.email,
        subject: 'Your Password Reset Token',
        html: makeANiceEmail(`Your Password Reset Token is here!
      \n\n
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
      })
      return { message: 'Thanks!' }
    },
    async resetPassword(
      _: any,
      {
        password,
        confirmPassword,
        resetToken,
      }: { password: string; confirmPassword: string; resetToken: string },
      { res, prisma }: Context
    ) {
      // 1. check if the passwords match
      if (password !== confirmPassword) {
        throw new Error("Yo Passwords don't match!")
      }
      // 2. check if its a legit reset token
      // 3. Check if its expired
      const [user] = await prisma.user.findMany({
        where: { resetToken },
      })
      if (!user) {
        throw new Error('This token is either invalid or expired!')
      }
      // 4. Hash their new password
      const hash = await bcrypt.hash(password, 10)
      // 5. Save the new password to the user and remove old resetToken fields
      const updatedUser = await prisma.user.update({
        where: { email: user.email },
        data: {
          password: hash,
          resetToken: null,
          resetTokenExpiry: null,
        },
      })
      // 6. Generate JWT
      const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET as string)
      // 7. Set the JWT cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      })
      // 8. return the new user
      return updatedUser
    },
    async updatePermissions(_: any, { permissions }: { permissions: any }, { user, prisma }: Context) {
      // 1. Check if they are logged in
      if (!user) {
        throw new Error('You must be logged in!')
      }
      // 3. Check if they have permissions to do this
      hasPermission(user, ['ADMIN', 'PERMISSIONUPDATE'])
      // 4. Update the permissions
      return prisma.user.update({
        data: {
          permissions: { set: permissions },
        },
        where: {
          id: user.id,
        },
      })
    },
    async addToCart(_: any, { id }: { id: string }, { user, prisma }: Context) {
      if (!user) {
        throw new Error('You must be signed in')
      }
      const [existingCartItem] = await prisma.cartItem.findMany({
        where: {
          userId: user.id,
          itemId: id,
        },
      })
      if (existingCartItem) {
        return prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 },
        })
      }
      return await prisma.cartItem.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          item: {
            connect: { id },
          },
        },
      })
    },
    async deleteCartItem(_: any, { id }: { id: string }, { user, prisma }: Context) {
      const cartItem = await prisma.cartItem.findOne({ where: { id } })
      if (!cartItem) throw new Error('No CartItem found!')
      if (cartItem.userId !== user.id) throw new Error('The item must be in your own cart')
      const deleted = await prisma.cartItem.delete({ where: { id } })
      return deleted
    },
    async checkout(_: any, { token }: { token: string }, { user, prisma }: Context) {
      if (!user) throw new Error('You must be signed in to complete this order.')
      const amount = user.cart.reduce(
        (tally: number, cartItem: CartItem) => tally + cartItem.item.price * cartItem.quantity,
        0
      )
      const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        confirm: true,
        payment_method: token,
      })
      const orderItems = user.cart.map((cartItem: CartItem) => {
        const { title, description, price, image, largeImage } = cartItem.item
        const orderItem = {
          title,
          description,
          price,
          image,
          largeImage,
          quantity: cartItem.quantity,
          user: { connect: { id: user.id } },
        }
        return orderItem
      })
      const order = await prisma.order.create({
        data: {
          total: paymentIntent.amount,
          charge: paymentIntent.id,
          items: { create: orderItems },
          user: { connect: { id: user.id } },
        },
        include: { items: true },
      })

      /** TODO: Delete Many */
      // const cartItemIds = user.cart.map((cartItem: CartItem) => cartItem.id);
      // await prisma.cartItem.deleteMany({
      //   where: {
      //     id: cartItemIds,
      //   },
      // });
      user.cart.forEach(async ({ id }: { id: string }) => prisma.cartItem.delete({ where: { id } }))

      return order
    },
  },
}
