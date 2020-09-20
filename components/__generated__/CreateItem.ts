/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateItem
// ====================================================

export interface CreateItem_createItem {
  __typename: 'Item'
  id: string
}

export interface CreateItem {
  createItem: CreateItem_createItem
}

export interface CreateItemVariables {
  title: string
  description: string
  price: number
  image?: string | null
  largeImage?: string | null
}
