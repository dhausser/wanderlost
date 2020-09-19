/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UPDATE_ITEM_MUTATION
// ====================================================

export interface UPDATE_ITEM_MUTATION_updateItem {
  __typename: 'Item'
  id: string
  title: string
  description: string
  price: number
}

export interface UPDATE_ITEM_MUTATION {
  updateItem: UPDATE_ITEM_MUTATION_updateItem
}

export interface UPDATE_ITEM_MUTATIONVariables {
  id: string
  title?: string | null
  description?: string | null
  price?: number | null
}
