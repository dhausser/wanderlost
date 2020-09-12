import { Context } from '../../types'

export async function addToCart(_: any, { id }: { id: string }, { req, prisma }: Context) {
  if (!req.userId) {
    throw new Error('You must be signed in')
  }
  const [existingCartItem] = await prisma.cartItem.findMany({
    where: {
      userId: req.userId,
      itemId: id,
    },
  })
  if (existingCartItem) {
    return prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    })
  }
  return await prisma.cartItem.create({
    data: {
      user: {
        connect: { id: req.userId },
      },
      item: {
        connect: { id },
      },
    },
  })
}
