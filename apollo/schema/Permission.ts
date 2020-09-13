import { enumType } from '@nexus/schema'

export const Permission = enumType({
  name: 'Permission',
  members: ['ADMIN', 'ITEMCREATE', 'ITEMDELETE', 'ITEMUPDATE', 'PERMISSIONUPDATE', 'USER'],
})
