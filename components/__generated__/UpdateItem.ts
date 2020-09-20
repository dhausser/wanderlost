/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateItem
// ====================================================

export interface UpdateItem_updateItem {
  __typename: 'Item'
  id: string
  title: string
  description: string
  price: number
}

export interface UpdateItem {
  updateItem: UpdateItem_updateItem
}

export interface UpdateItemVariables {
  id: string
  title?: string | null
  description?: string | null
  price?: number | null
}
