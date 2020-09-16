export function item(_, { id }, { prisma }) {
  return prisma.item.findOne({ where: { id } })
}
