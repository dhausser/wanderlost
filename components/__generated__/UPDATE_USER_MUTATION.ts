/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UPDATE_USER_MUTATION
// ====================================================

export interface UPDATE_USER_MUTATION_updateUser {
  __typename: 'User'
  id: string
  name: string
}

export interface UPDATE_USER_MUTATION {
  updateUser: UPDATE_USER_MUTATION_updateUser
}

export interface UPDATE_USER_MUTATIONVariables {
  name: string
  id: string
}
