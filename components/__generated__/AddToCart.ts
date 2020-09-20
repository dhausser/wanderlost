/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToCart
// ====================================================

export interface AddToCart_addToCart {
  __typename: 'CartItem'
  id: string
  quantity: number
}

export interface AddToCart {
  addToCart: AddToCart_addToCart | null
}

export interface AddToCartVariables {
  id: string
}
