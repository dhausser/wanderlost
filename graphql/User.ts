import {
  objectType,
  enumType,
  extendType,
  stringArg,
  idArg,
  arg,
} from '@nexus/schema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'
import { promisify } from 'util'
import { randomBytes } from 'crypto'
import { setCookie, hasPermission } from './utils'

// import { Permission as PermissionType } from '@prisma/client'
// type Permissions = "ADMIN" | "ITEMCREATE" | "ITEMDELETE" | "ITEMUPDATE" | "PERMISSIONUPDATE" | "USER"

interface PermissionType {
  USER: 'USER'
  ADMIN: 'ADMIN'
  ITEMCREATE: 'ITEMCREATE'
  ITEMUPDATE: 'ITEMUPDATE'
  ITEMDELETE: 'ITEMDELETE'
  PERMISSIONUPDATE: 'PERMISSIONUPDATE'
}

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('email')
    t.string('password')
    t.string('resetToken', { nullable: true })
    t.float('resetTokenExpiry', { nullable: true })
    t.field('permissions', {
      type: 'Permission',
      list: [false],
      nullable: true,
    })
    t.list.field('cart', {
      type: 'CartItem',
      async resolve(root, _args, ctx) {
        const cart = await ctx.prisma.user
          .findOne({
            where: { id: root.id },
          })
          .cart()
        if (!cart) {
          throw new Error(`No cart found for user with id: ${root.id}`)
        }
        return cart
      },
    })
    t.field('orders', {
      type: 'OrderItem',
      list: [false],
      nullable: true,
      async resolve(root, _args, ctx) {
        const orders = await ctx.prisma.user
          .findOne({
            where: { id: root.id },
          })
          .OrderItem()
        if (!orders) {
          throw new Error(`No orders found for user with id: ${root.id}`)
        }
        return orders
      },
    })
  },
})

export const UserInput = objectType({
  name: 'UserInput',
  definition(t) {
    t.string('email')
    t.string('password')
    t.string('name')
  },
})

export const SuccessMessage = objectType({
  name: 'SuccessMessage',
  definition(t) {
    t.string('message')
  },
})

export const Permission = enumType({
  name: 'Permission',
  members: [
    'ADMIN',
    'ITEMCREATE',
    'ITEMDELETE',
    'ITEMUPDATE',
    'PERMISSIONUPDATE',
    'USER',
  ],
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: User,
      nullable: true,
      resolve(_root, _args, ctx) {
        if (!ctx.req.userId) {
          return null
        }
        return ctx.prisma.user.findOne({
          where: { id: ctx.req.userId },
          include: { cart: true },
        })
      },
    })

    t.field('users', {
      type: User,
      list: [false],
      nullable: true,
      resolve(_root, _args, ctx) {
        return ctx.prisma.user.findMany({
          include: { cart: true },
        })
      },
    })
  },
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: User,
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
        name: stringArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.prisma.user.create({
          data: {
            email: args.email.toLocaleLowerCase(),
            name: args.name,
            password: await bcrypt.hash(args.password, 10),
            permissions: {
              set: ['USER', 'ITEMCREATE', 'ITEMDELETE', 'ITEMUPDATE'],
            },
          },
        })
        const token = jwt.sign(
          { userId: user.id },
          process.env.APP_SECRET as string
        )
        ctx.res.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        })
        return user
      },
    })

    t.field('signin', {
      type: User,
      nullable: true,
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        // 1. check if there is a user with that email
        const user = await ctx.prisma.user.findOne({
          where: { email: args.email },
        })
        if (!user) {
          throw new Error(`No such user found for email ${args.email}`)
        }
        // 2. Check if their password is correct
        const valid = await bcrypt.compare(args.password, user.password)
        if (!valid) {
          throw new Error('Invalid Password!')
        }

        // 3. generate the JWT Token
        const token = jwt.sign(
          { userId: user.id },
          process.env.APP_SECRET as string
        )

        // 4. Set the cookie with the token
        ctx.res.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        })

        // 5. Return the user
        return user
      },
    })

    t.field('signout', {
      type: SuccessMessage,
      resolve(_root, _args, ctx) {
        setCookie(ctx.res, 'token', '', {})
        return { message: 'Goodbye!' }
      },
    })

    t.field('requestReset', {
      type: SuccessMessage,
      args: {
        email: stringArg({ required: true }),
      },
      async resolve(_, args, ctx) {
        const user = await ctx.prisma.user.findOne({
          where: { email: args.email },
        })
        if (!user) {
          throw new Error(`No user found for email: ${args.email}'`)
        }
        const randomBytesPromiseified = promisify(randomBytes)
        const resetToken = (await randomBytesPromiseified(20)).toString('hex')
        const resetTokenExpiry = Date.now() + 3600000
        await ctx.prisma.user.update({
          where: { email: args.email },
          data: { resetToken, resetTokenExpiry },
        })

        const makeANiceEmail = (text: string) => `
          <div classname="email" style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px;
          ">
            <h2>Hello there</>
            <p>${text}</p>

            <p>😘, Davy Hausser</p>
          </div?
        `

        const msg = {
          to: user.email,
          from: 'davy.hausser@icloud.com',
          subject: 'Your Password Reset Token',
          text: 'and easy to do anywhere, even with Node.js',
          html: makeANiceEmail(`Your Password Reset Token is here!
          \n\n
          <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
        }
        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
        sgMail.send(msg)
        return { message: 'Thanks!' }
      },
    })

    t.field('resetPassword', {
      type: User,
      args: {
        resetToken: stringArg({ required: true }),
        password: stringArg({ required: true }),
        confirmPassword: stringArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        // 1. check if the passwords match
        if (args.password !== args.confirmPassword) {
          throw new Error("Yo Passwords don't match!")
        }
        // 2. check if its a legit reset token
        // 3. Check if its expired
        const [user] = await ctx.prisma.user.findMany({
          where: { resetToken: args.resetToken },
        })
        if (!user) {
          throw new Error('This token is either invalid or expired!')
        }
        // 4. Hash their new password
        const hash = await bcrypt.hash(args.password, 10)
        // 5. Save the new password to the user and remove old resetToken fields
        const updatedUser = await ctx.prisma.user.update({
          where: { email: user.email },
          data: {
            password: hash,
            resetToken: null,
            resetTokenExpiry: null,
          },
        })
        // 6. Generate JWT
        const token = jwt.sign(
          { userId: updatedUser.id },
          process.env.APP_SECRET as string
        )
        // 7. Set the JWT cookie
        ctx.res.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        })
        // 8. return the new user
        return updatedUser
      },
    })

    t.field('updatePermissions', {
      type: User,
      nullable: true,
      args: {
        permissions: arg({
          type: 'Permission',
          list: [false],
        }),
        userId: idArg({ required: true }),
      },
      async resolve(_, args, ctx) {
        // 1. Check if they are logged in
        if (!ctx.req.userId) {
          throw new Error('You must be logged in!')
        }
        // 2. Retrieve user from the database
        const user = await ctx.prisma.user.findOne({
          where: { id: ctx.req.userId },
        })
        // 3. Check if they have permissions to do this
        if (!user) throw new Error(`User not found: ${ctx.req.userId}`)
        hasPermission(user, ['ADMIN', 'PERMISSIONUPDATE'])
        // 4. Update the permissions
        return ctx.prisma.user.update({
          data: {
            permissions: { set: args?.permissions as PermissionType[] },
          },
          where: {
            id: ctx.req.userId,
          },
        })
      },
    })

    t.field('updateUser', {
      type: 'User',
      args: {
        id: idArg({ required: true }),
        name: stringArg({ required: true }),
      },
      async resolve(_, args, ctx) {
        if (!ctx.req.userId) {
          throw new Error('You must be logged in!')
        }
        return ctx.prisma.user.update({
          where: { id: args.id },
          data: {
            name: args.name,
          },
        })
      },
    })
  },
})
