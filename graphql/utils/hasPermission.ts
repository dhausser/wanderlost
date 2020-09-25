import { Enumerable } from '@prisma/client'
import { GetCurrentUser_user } from '../../components/__generated__/GetCurrentUser'

const hasPermission = (user: GetCurrentUser_user, permissionsNeeded: string[]) => {
  if (!user || !user.permissions) return null
  const matchedPermissions = user.permissions.filter(
    (permissionTheyHave: Enumerable<string | null>) =>
      // @ts-expect-error
      Object.entries(permissionsNeeded).includes(permissionTheyHave)
  )
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions
      : ${permissionsNeeded}
      You Have:
      ${user.permissions}
      `)
  }
}

export { hasPermission }
