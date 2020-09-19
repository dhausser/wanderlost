/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SINGLE_ITEM_QUERY
// ====================================================

export interface SINGLE_ITEM_QUERY_item {
  __typename: 'Item'
  id: string
  title: string
  description: string
  largeImage: string | null
}

export interface SINGLE_ITEM_QUERY {
  item: SINGLE_ITEM_QUERY_item | null
}

export interface SINGLE_ITEM_QUERYVariables {
  id: string
}
