export async function updateItem(_, args, { prisma }) {
  return prisma.item.update({
    data: { ...args },
    where: { id: args.id },
  })
}
