/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SIGNUP_MUTATION
// ====================================================

export interface SIGNUP_MUTATION_signup {
  __typename: 'User'
  id: string
  email: string
  name: string
}

export interface SIGNUP_MUTATION {
  signup: SIGNUP_MUTATION_signup
}

export interface SIGNUP_MUTATIONVariables {
  email: string
  name: string
  password: string
}
