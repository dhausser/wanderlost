/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Signup
// ====================================================

export interface Signup_signup {
  __typename: 'User'
  id: string
  email: string
  name: string
}

export interface Signup {
  signup: Signup_signup
}

export interface SignupVariables {
  email: string
  name: string
  password: string
}
