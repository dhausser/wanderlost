/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser {
  __typename: 'User'
  id: string
  name: string
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser
}

export interface UpdateUserVariables {
  name: string
  id: string
}
