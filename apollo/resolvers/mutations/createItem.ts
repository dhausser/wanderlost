import { Context, ItemInput } from '../../types'

export async function createItem(_: any, args: ItemInput, { prisma, user }: Context) {
  if (!user) {
    throw new Error('You must be logged in to do that!')
  }
  const item = await prisma.item.create({
    data: {
      ...args,
      user: {
        connect: { id: user.id },
      },
    },
  })
  return item
}
