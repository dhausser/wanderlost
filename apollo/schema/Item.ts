import { extendType, objectType, inputObjectType, stringArg, intArg, idArg } from '@nexus/schema'
import { allItems } from './queries/allItems'
import { items } from './queries/items'
import { item } from './queries/item'

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('description')
    t.string('image', { nullable: true })
    t.string('largeImage', { nullable: true })
    t.int('price')
    t.string('userId')
    t.field('user', {
      type: 'User',
      async resolve(root, _args, ctx) {
        const user = await ctx.prisma.item
          .findOne({
            where: { id: root.id },
          })
          .user()
        if (!user) {
          throw new Error(`No item found for id: ${root.id}`)
        }
        return user
      },
    })
  },
})

export const ItemConnection = objectType({
  name: 'ItemConnection',
  definition(t) {
    t.field('items', {
      type: Item,
      list: [false],
    })
    t.int('total')
    t.boolean('hasMore')
  },
})

export const ItemsInput = inputObjectType({
  name: 'ItemsInput',
  definition(t) {
    t.string('title')
    t.string('description')
  },
})

export const ItemQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('allItems', {
      type: Item,
      list: [false],
      args: {
        searchTerm: stringArg(),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.item.findMany({
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
      },
    })

    t.field('items', {
      type: 'ItemConnection',
      args: {
        offset: intArg(),
        limit: intArg(),
      },
      async resolve(_, { offset = 0, limit = 4 }, ctx) {
        const allItems = await ctx.prisma.item.findMany()
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
    })

    t.field('item', {
      type: Item,
      nullable: true,
      args: {
        id: idArg({ required: true }),
      },
      resolve: async (_root, args, ctx) => {
        return ctx.prisma.item.findOne({
          where: { id: args.id },
          include: { user: true },
        })
      },
    })
  },
})

export const ItemMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createItem', {
      type: Item,
      args: {
        title: stringArg({ required: true }),
        description: stringArg({ required: true }),
        price: intArg({ required: true }),
        image: stringArg(),
        largeImage: stringArg(),
      },
      async resolve(_, args, ctx) {
        if (!ctx.req.userId) {
          throw new Error('You must be logged in to do that!')
        }
        const item = await ctx.prisma.item.create({
          data: {
            ...args,
            user: {
              connect: { id: ctx.req.userId },
            },
          },
        })
        return item
      },
    })

    t.field('updateItem', {
      type: Item,
      args: {
        id: idArg({ required: true }),
        title: stringArg(),
        description: stringArg(),
        price: intArg(),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.item.update({
          data: { ...args },
          where: { id: args.id },
        })
      },
    })

    t.field('deleteItem', {
      type: Item,
      nullable: true,
      args: {
        id: idArg({ required: true }),
      },
      async resolve(_, args, ctx) {
        // 1. find the item
        const item = await ctx.prisma.item.findOne({
          where: { id: args.id },
        })
        if (!item) {
          throw new Error('Item does not exist')
        }
        // 2. Check if they own that item, or have the permissions
        const ownsItem = item.userId === ctx.req.userId
        const user = await ctx.prisma.user.findOne({
          where: { id: ctx.req.userId },
        })
        const hasPermissions = user.permissions.some((permission: string) =>
          ['ADMIN', 'ITEMDELETE'].includes(permission)
        )

        if (!ownsItem && !hasPermissions) {
          throw new Error("You don't have permission to do that!")
        }

        // 3. Delete it!
        return ctx.prisma.item.delete({ where: { id: args.id } })
      },
    })
  },
})
