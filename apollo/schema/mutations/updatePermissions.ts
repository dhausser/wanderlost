import { hasPermission } from '../../utils'

export async function updatePermissions(_, args, ctx) {
  // 1. Check if they are logged in
  if (!ctx.req.userId) {
    throw new Error('You must be logged in!')
  }
  // 3. Check if they have permissions to do this
  const user = await ctx.prisma.user.findOne({
    where: { id: ctx.req.userId },
  })
  hasPermission(user, ['ADMIN', 'PERMISSIONUPDATE'])
  // 4. Update the permissions
  return ctx.prisma.user.update({
    data: {
      permissions: { set: args?.permissions },
    },
    where: {
      id: ctx.req.userId,
    },
  })
}
