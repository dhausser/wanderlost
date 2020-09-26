import { Enumerable, User } from '@prisma/client'

const hasPermission = (user: User, permissionsNeeded: string[]): null | undefined => {
  if (!user || !user.permissions) return null
  const matchedPermissions = user.permissions.filter(
    (permissionTheyHave: Enumerable<string | null>) =>
      // @ts-expect-error as permissionTheyHave 'null' is not assignable to type '[string, string]
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
