export async function item(_, { id }, { prisma }) {
  const item = await prisma.item.findOne({ where: { id } })
  if (!item) {
    throw new Error(`No item found for id: ${id}`)
  }
  return item
}
