import { Context } from '../../types'

export async function allItems(_parent: any, args: { searchTerm: string }, { prisma }: Context) {
  const allItems = await prisma.item.findMany({
    where: {
      OR: [
        {
          title: {
            contains: args.searchTerm,
          },
        },
        {
          description: {
            contains: args.searchTerm,
          },
        },
      ],
    },
  })
  return Array.isArray(allItems) ? allItems : []
}
