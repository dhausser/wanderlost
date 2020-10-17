/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetItems
// ====================================================

export interface GetItems_items_items {
  __typename: 'Item'
  id: string
  title: string
  price: number
  description: string
  image: string | null
  largeImage: string | null
}

export interface GetItems_items {
  __typename: 'ItemConnection'
  items: (GetItems_items_items | null)[]
  hasMore: boolean
}

export interface GetItems {
  items: GetItems_items
}

export interface GetItemsVariables {
  offset?: number | null
  limit?: number | null
}
