import { objectType, extendType, idArg, stringArg } from '@nexus/schema'
import Stripe from 'stripe'

interface CartItemType {
  id: string
  quantity: number
  itemId: string
  userId: string
}

interface Item {
  id: string
  title: string
  description: string
  image: string | null
  largeImage: string | null
  price: number
  userId: string
  createdAt: Date
  updatedAt: Date
}

export const OrderItem = objectType({
  name: 'OrderItem',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('description')
    t.string('image')
    t.string('largeImage')
    t.int('price')
    t.int('quantity')
    t.field('user', {
      type: 'User',
      nullable: true,
      async resolve(root, _args, ctx) {
        const user = await ctx.prisma.orderItem
          .findOne({
            where: { id: root.id },
          })
          .user()
        if (!user) {
          throw new Error(`No user found for id: ${root.id}`)
        }
        return user
      },
    })
  },
})

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.id('id')
    t.list.field('items', { type: OrderItem })
    t.int('total')
    t.field('user', {
      type: 'User',
      async resolve(root, _args, ctx) {
        const user = await ctx.prisma.order
          .findOne({
            where: { id: root.id },
          })
          .user()
        if (!user) {
          throw new Error(`No user found for id: ${root.id}`)
        }
        return user
      },
    })
    t.string('charge')
    t.field('createdAt', {
      type: 'Date',
    })
    t.field('updatedAt', {
      type: 'Date',
    })
  },
})

export const CartItem = objectType({
  name: 'CartItem',
  definition(t) {
    t.id('id')
    t.int('quantity')
    t.field('item', {
      type: 'Item',
      nullable: true,
      resolve(root, _args, ctx) {
        return ctx.prisma.cartItem
          .findOne({
            where: { id: root.id },
          })
          .item()
      },
    })
    t.field('user', {
      type: 'User',
      async resolve(root, _args, ctx) {
        const cartItem = await ctx.prisma.cartItem
          .findOne({
            where: { id: root.id },
          })
          .user()
        if (!cartItem) {
          throw new Error(`No cart item found for id: ${root.id}`)
        }
        return cartItem
      },
    })
  },
})

export const OrderQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('order', {
      type: Order,
      nullable: true,
      args: {
        id: idArg({ required: true }),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.order.findOne({
          where: { id: args.id },
          include: { user: true, items: true },
        })
      },
    })

    t.field('orders', {
      type: Order,
      list: [false],
      resolve(_root, _args, ctx) {
        return ctx.prisma.order.findMany({
          where: { userId: ctx.req.userId },
          include: { items: true },
        })
      },
    })
  },
})

export const OrderMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addToCart', {
      type: CartItem,
      nullable: true,
      args: {
        id: idArg({ required: true }),
      },
      async resolve(_, args, ctx) {
        if (!ctx.req.userId) {
          throw new Error('You must be signed in')
        }
        const [existingCartItem] = await ctx.prisma.cartItem.findMany({
          where: {
            userId: ctx.req.userId,
            itemId: args.id,
          },
        })
        if (existingCartItem) {
          return ctx.prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + 1 },
          })
        }
        return await ctx.prisma.cartItem.create({
          data: {
            user: {
              connect: { id: ctx.req.userId },
            },
            item: {
              connect: { id: args.id },
            },
          },
        })
      },
    })

    t.field('deleteCartItem', {
      type: CartItem,
      nullable: true,
      args: {
        id: idArg({ required: true }),
      },
      async resolve(_, args, ctx) {
        const cartItem = await ctx.prisma.cartItem.findOne({
          where: { id: args.id },
        })
        if (!cartItem) throw new Error('No CartItem found!')
        if (cartItem.userId !== ctx.req.userId)
          throw new Error('The item must be in your own cart')
        const deleted = await ctx.prisma.cartItem.delete({
          where: { id: args.id },
        })
        return deleted
      },
    })

    t.field('checkout', {
      type: Order,
      args: {
        token: stringArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        if (!ctx.req.userId)
          throw new Error('You must be signed in to complete this order.')
        const user = await ctx.prisma.user.findOne({
          where: { id: ctx.req.userId },
          include: {
            cart: {
              include: {
                item: true,
              },
            },
          },
        })
        if (!user) throw new Error(`User not found: ${ctx.req.userId}`)

        const amount = user.cart.reduce(
          (tally: number, cartItem: CartItemType & { item: Item }) =>
            tally + cartItem.item.price * cartItem.quantity,
          0
        )

        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
          {
            amount,
            currency: 'USD',
            confirm: true,
            payment_method: args.token,
          }
        )

        const orderItems = user.cart.map(
          (cartItem: CartItemType & { item: Item }) => {
            const {
              title,
              description,
              price,
              image,
              largeImage,
            } = cartItem.item
            const orderItem = {
              title,
              description,
              price,
              image: image as string,
              largeImage: largeImage as string,
              quantity: cartItem.quantity,
              user: { connect: { id: user.id } },
            }
            return orderItem
          }
        )

        const order = await ctx.prisma.order.create({
          data: {
            total: paymentIntent.amount,
            charge: paymentIntent.id,
            items: { create: [...orderItems] },
            user: { connect: { id: user.id } },
          },
          include: { items: true },
        })

        const cartItemIds = user.cart.map(
          (cartItem: CartItemType & { item: Item }) => cartItem.id
        )

        await ctx.prisma.cartItem.deleteMany({
          where: {
            id: {
              in: cartItemIds,
            },
          },
        })

        return order
      },
    })
  },
})

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
  typescript: true,
})
