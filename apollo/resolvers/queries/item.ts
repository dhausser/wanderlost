import { Context } from '../../types'

export async function item(_: any, { id }: { id: string }, { prisma }: Context) {
  return prisma.item.findOne({ where: { id } })
}
