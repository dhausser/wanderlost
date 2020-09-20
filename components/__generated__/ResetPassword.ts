/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_resetPassword {
  __typename: 'User'
  email: string
  name: string
  password: string
}

export interface ResetPassword {
  resetPassword: ResetPassword_resetPassword
}

export interface ResetPasswordVariables {
  resetToken: string
  password: string
  confirmPassword: string
}
