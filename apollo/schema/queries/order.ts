export async function order(_, { id }, { prisma }) {
  const order = await prisma.order.findOne({
    where: { id },
    include: { user: true, items: true },
  })
  return order
}
