/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Permission } from './../../__generated__/globalTypes'

// ====================================================
// GraphQL mutation operation: UpdatePermissions
// ====================================================

export interface UpdatePermissions_updatePermissions {
  __typename: 'User'
  id: string
  permissions: (Permission | null)[] | null
  name: string
  email: string
}

export interface UpdatePermissions {
  updatePermissions: UpdatePermissions_updatePermissions | null
}

export interface UpdatePermissionsVariables {
  permissions?: (Permission | null)[] | null
  userId: string
}
