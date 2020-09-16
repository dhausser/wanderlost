export async function deleteItem(_, { id }, { req, prisma }) {
  // 1. find the item
  const item = await prisma.item.findOne({
    where: { id },
  })
  if (!item) {
    throw new Error('Item does not exist')
  }
  // 2. Check if they own that item, or have the permissions
  const ownsItem = item.userId === req.userId
  const user = await prisma.user.findOne({
    where: { id: req.userId },
  })
  const hasPermissions = user.permissions.some((permission: string) =>
    ['ADMIN', 'ITEMDELETE'].includes(permission)
  )

  if (!ownsItem && !hasPermissions) {
    throw new Error("You don't have permission to do that!")
  }

  // 3. Delete it!
  return prisma.item.delete({ where: { id } })
}
