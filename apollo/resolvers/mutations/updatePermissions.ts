import { hasPermission } from '../../utils'
import { Context } from '../../types'

export async function updatePermissions(
  _: any,
  { permissions }: { permissions: any },
  { req, prisma }: Context
) {
  // 1. Check if they are logged in
  if (!req.userId) {
    throw new Error('You must be logged in!')
  }
  // 3. Check if they have permissions to do this
  const user = await prisma.user.findOne({
    where: { id: req.userId },
  })
  hasPermission(user, ['ADMIN', 'PERMISSIONUPDATE'])
  // 4. Update the permissions
  return prisma.user.update({
    data: {
      permissions: { set: permissions },
    },
    where: {
      id: req.userId,
    },
  })
}
