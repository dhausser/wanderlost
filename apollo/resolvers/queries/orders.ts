import { Context } from '../../types'

export async function orders(_: any, __: null, { user, prisma }: Context) {
  return prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
  })
}
