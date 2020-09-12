import { Context, ItemInput } from '../../types'

export async function createItem(_: any, args: ItemInput, { req, prisma }: Context) {
  if (!req.userId) {
    throw new Error('You must be logged in to do that!')
  }
  const item = await prisma.item.create({
    data: {
      ...args,
      user: {
        connect: { id: req.userId },
      },
    },
  })
  return item
}
