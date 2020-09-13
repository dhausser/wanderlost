import { extendType, objectType, inputObjectType, stringArg, intArg, idArg } from '@nexus/schema'

export const Query = extendType({
  type: 'Query',
  definition(t) {
    t.field('allItems', {
      type: 'Item',
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
      type: 'Item',
      nullable: true,
      args: {
        id: idArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.item.findOne({ where: { id: args.id } })
      },
    })
  },
})

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('description')
    t.string('image', { nullable: true })
    t.string('largeImage', { nullable: true })
    t.int('price')
    t.field('user', { type: 'User' })
  },
})

export const ItemConnection = objectType({
  name: 'ItemConnection',
  definition(t) {
    t.field('items', {
      type: 'Item',
      list: [false],
    })
    t.int('total')
    t.boolean('hasMore')
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
    })
    t.field('user', { type: 'User' })
  },
})

export const ItemsInput = inputObjectType({
  name: 'ItemsInput',
  definition(t) {
    t.string('title')
    t.string('description')
  },
})
