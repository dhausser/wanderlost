/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Permission } from './../../__generated__/globalTypes'

// ====================================================
// GraphQL query operation: ALL_USERS_QUERY
// ====================================================

export interface ALL_USERS_QUERY_users {
  __typename: 'User'
  id: string
  name: string
  email: string
  permissions: (Permission | null)[] | null
}

export interface ALL_USERS_QUERY {
  users: (ALL_USERS_QUERY_users | null)[] | null
}
