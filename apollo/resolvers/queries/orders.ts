import { Context } from '../../types'

export async function orders(_: any, __: null, { req, prisma }: Context) {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    include: { items: true },
  })
  console.log(orders)
  return Array.isArray(orders) ? orders : []
}
