/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Permission } from './../../__generated__/globalTypes'

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users {
  __typename: 'User'
  id: string
  name: string
  email: string
  permissions: (Permission | null)[] | null
}

export interface GetUsers {
  users: (GetUsers_users | null)[] | null
}
