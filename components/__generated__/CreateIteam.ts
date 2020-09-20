/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateIteam
// ====================================================

export interface CreateIteam_createItem {
  __typename: 'Item'
  id: string
}

export interface CreateIteam {
  createItem: CreateIteam_createItem
}

export interface CreateIteamVariables {
  title: string
  description: string
  price: number
  image?: string | null
  largeImage?: string | null
}
