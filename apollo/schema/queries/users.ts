export function users(_, __, { prisma }) {
  return prisma.user.findMany({
    include: { cart: true },
  })
}
