export async function orders(_, __, { req, prisma }) {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    include: { items: true },
  })
  return Array.isArray(orders) ? orders : []
}
