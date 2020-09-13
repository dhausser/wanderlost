export function user(_, __, { req, prisma }) {
  if (!req.userId) {
    return null
  }
  return prisma.user.findOne({
    where: { id: req.userId },
    include: { cart: true },
  })
}
