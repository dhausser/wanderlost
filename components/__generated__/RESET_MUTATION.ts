/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RESET_MUTATION
// ====================================================

export interface RESET_MUTATION_resetPassword {
  __typename: 'User'
  email: string
  name: string
  password: string
}

export interface RESET_MUTATION {
  resetPassword: RESET_MUTATION_resetPassword
}

export interface RESET_MUTATIONVariables {
  resetToken: string
  password: string
  confirmPassword: string
}
