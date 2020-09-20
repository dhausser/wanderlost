/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveFromCart
// ====================================================

export interface RemoveFromCart_deleteCartItem {
  __typename: 'CartItem'
  id: string
}

export interface RemoveFromCart {
  deleteCartItem: RemoveFromCart_deleteCartItem | null
}

export interface RemoveFromCartVariables {
  id: string
}
