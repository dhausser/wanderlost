/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetItem
// ====================================================

export interface GetItem_item {
  __typename: 'Item'
  id: string
  title: string
  price: number
  description: string
  largeImage: string | null
}

export interface GetItem {
  item: GetItem_item | null
}

export interface GetItemVariables {
  id: string
}
