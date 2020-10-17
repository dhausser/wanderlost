/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Permission } from './../../__generated__/globalTypes'

// ====================================================
// GraphQL query operation: GetCurrentUser
// ====================================================

export interface GetCurrentUser_user_cart_item {
  __typename: 'Item'
  id: string
  price: number
  image: string | null
  title: string
  description: string
}

export interface GetCurrentUser_user_cart {
  __typename: 'CartItem'
  id: string
  quantity: number
  item: GetCurrentUser_user_cart_item | null
}

export interface GetCurrentUser_user {
  __typename: 'User'
  id: string
  email: string
  name: string
  permissions: (Permission | null)[] | null
  cart: GetCurrentUser_user_cart[]
}

export interface GetCurrentUser {
  user: GetCurrentUser_user | null
}
