/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SIGNIN_MUTATION
// ====================================================

export interface SIGNIN_MUTATION_signin {
  __typename: 'User'
  id: string
  email: string
  name: string
}

export interface SIGNIN_MUTATION {
  signin: SIGNIN_MUTATION_signin | null
}

export interface SIGNIN_MUTATIONVariables {
  email: string
  password: string
}
