export async function createItem(_, args, { req, prisma }) {
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
