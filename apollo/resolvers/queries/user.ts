import { Context } from '../../types'

export function user(_: any, __: null, { req, prisma }: Context) {
  if (!req.userId) {
    return null
  }
  return prisma.user.findOne({
    where: { id: req.userId },
    include: { cart: true },
  })
}
