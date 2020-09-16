export async function items(_, { offset = 0, limit = 4 }, { prisma }) {
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
