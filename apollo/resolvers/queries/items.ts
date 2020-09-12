import { Context, Pagination } from '../../types'

export async function items(_: any, { offset = 0, limit = 4 }: Pagination, { prisma }: Context) {
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
}
