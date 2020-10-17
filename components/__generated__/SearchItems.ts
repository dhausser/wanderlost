/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchItems
// ====================================================

export interface SearchItems_allItems {
  __typename: 'Item'
  id: string
  image: string | null
  title: string
}

export interface SearchItems {
  allItems: (SearchItems_allItems | null)[]
}

export interface SearchItemsVariables {
  searchTerm: string
}
