import { Context, UserInput, ItemInput, Pagination, CartItem } from '../types'

export const Query = {
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
}
