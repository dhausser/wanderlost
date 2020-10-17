/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Checkout
// ====================================================

export interface Checkout_checkout_items {
  __typename: 'OrderItem'
  id: string
  title: string
}

export interface Checkout_checkout {
  __typename: 'Order'
  id: string
  charge: string
  total: number
  items: Checkout_checkout_items[]
}

export interface Checkout {
  checkout: Checkout_checkout
}

export interface CheckoutVariables {
  token: string
}
