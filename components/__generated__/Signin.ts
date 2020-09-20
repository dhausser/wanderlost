/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Signin
// ====================================================

export interface Signin_signin {
  __typename: 'User'
  id: string
  email: string
  name: string
}

export interface Signin {
  signin: Signin_signin | null
}

export interface SigninVariables {
  email: string
  password: string
}
