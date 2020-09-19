/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Permission } from './../../__generated__/globalTypes'

// ====================================================
// GraphQL mutation operation: UPDATE_PERMISSIONS_MUTATION
// ====================================================

export interface UPDATE_PERMISSIONS_MUTATION_updatePermissions {
  __typename: 'User'
  id: string
  permissions: (Permission | null)[] | null
  name: string
  email: string
}

export interface UPDATE_PERMISSIONS_MUTATION {
  updatePermissions: UPDATE_PERMISSIONS_MUTATION_updatePermissions | null
}

export interface UPDATE_PERMISSIONS_MUTATIONVariables {
  permissions?: (Permission | null)[] | null
  userId: string
}
