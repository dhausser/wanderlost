import { Context } from '../../types'

export async function order(_: any, { id }: { id: string }, { prisma }: Context) {
  const order = await prisma.order.findOne({
    where: { id },
    include: { user: true, items: true },
  })
  return order
}
