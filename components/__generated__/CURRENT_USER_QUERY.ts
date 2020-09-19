/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Permission } from './../../__generated__/globalTypes'

// ====================================================
// GraphQL query operation: CURRENT_USER_QUERY
// ====================================================

export interface CURRENT_USER_QUERY_user_cart_item {
  __typename: 'Item'
  id: string
  price: number
  image: string | null
  title: string
  description: string
}

export interface CURRENT_USER_QUERY_user_cart {
  __typename: 'CartItem'
  id: string
  quantity: number
  item: CURRENT_USER_QUERY_user_cart_item | null
}

export interface CURRENT_USER_QUERY_user {
  __typename: 'User'
  id: string
  email: string
  name: string
  permissions: (Permission | null)[] | null
  cart: CURRENT_USER_QUERY_user_cart[]
}

export interface CURRENT_USER_QUERY {
  user: CURRENT_USER_QUERY_user | null
}
