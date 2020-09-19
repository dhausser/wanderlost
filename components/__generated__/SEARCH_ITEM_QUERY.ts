/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SEARCH_ITEM_QUERY
// ====================================================

export interface SEARCH_ITEM_QUERY_allItems {
  __typename: 'Item'
  id: string
  image: string | null
  title: string
}

export interface SEARCH_ITEM_QUERY {
  allItems: (SEARCH_ITEM_QUERY_allItems | null)[]
}

export interface SEARCH_ITEM_QUERYVariables {
  searchTerm: string
}
