import { Context } from '../../types'

export function users(_: any, __: null, { prisma }: Context) {
  return prisma.user.findMany({
    include: { cart: true },
  })
}
