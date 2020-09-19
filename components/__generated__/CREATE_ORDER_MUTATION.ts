/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CREATE_ORDER_MUTATION
// ====================================================

export interface CREATE_ORDER_MUTATION_checkout_items {
  __typename: 'OrderItem'
  id: string
  title: string
}

export interface CREATE_ORDER_MUTATION_checkout {
  __typename: 'Order'
  id: string
  charge: string
  total: number
  items: CREATE_ORDER_MUTATION_checkout_items[]
}

export interface CREATE_ORDER_MUTATION {
  checkout: CREATE_ORDER_MUTATION_checkout
}

export interface CREATE_ORDER_MUTATIONVariables {
  token: string
}
