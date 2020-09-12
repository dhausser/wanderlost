import { Context } from '../../types'

export async function deleteItem(_: any, { id }: { id: string }, { prisma, user }: Context) {
  const where = { id }
  // 1. find the item
  const item = await prisma.item.findOne({ where })
  if (!item) {
    throw new Error('Item does not exist')
  }
  // 2. Check if they own that item, or have the permissions
  const ownsItem = item.userId === user.id
  const hasPermissions = user.permissions.some((permission: string) =>
    ['ADMIN', 'ITEMDELETE'].includes(permission)
  )

  if (!ownsItem && !hasPermissions) {
    throw new Error("You don't have permission to do that!")
  }

  // 3. Delete it!
  return prisma.item.delete({ where })
}
