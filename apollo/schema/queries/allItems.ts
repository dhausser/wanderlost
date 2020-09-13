export async function allItems(_parent, { searchTerm }, { prisma }) {
  const allItems = await prisma.item.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
          },
        },
        {
          description: {
            contains: searchTerm,
          },
        },
      ],
    },
  })
  return Array.isArray(allItems) ? allItems : []
}
