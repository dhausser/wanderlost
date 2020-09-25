const hasPermission = (user: any, permissionsNeeded: any) => {
  const matchedPermissions = user.permissions.filter(
    (permissionTheyHave: any) => permissionsNeeded.includes(permissionTheyHave)
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
