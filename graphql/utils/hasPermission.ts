type Permission =
  | 'USER'
  | 'ADMIN'
  | 'ITEMCREATE'
  | 'ITEMUPDATE'
  | 'ITEMDELETE'
  | 'PERMISSIONUPDATE'

type Enumerable<T> = T | T[]

interface User {
  id: string
  email: string
  name: string
  password: string
  permissions: Permission[]
  resetToken: string | null
  resetTokenExpiry: number | null
  createdAt: Date
  updatedAt: Date
}

const hasPermission = (
  user: User,
  permissionsNeeded: string[]
): null | undefined => {
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
