/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SINGLE_ORDER_QUERY
// ====================================================

export interface SINGLE_ORDER_QUERY_order_user {
  __typename: 'User'
  id: string
}

export interface SINGLE_ORDER_QUERY_order_items {
  __typename: 'OrderItem'
  id: string
  title: string
  description: string
  price: number
  image: string
  quantity: number
}

export interface SINGLE_ORDER_QUERY_order {
  __typename: 'Order'
  id: string
  charge: string
  total: number
  createdAt: any
  user: SINGLE_ORDER_QUERY_order_user
  items: SINGLE_ORDER_QUERY_order_items[]
}

export interface SINGLE_ORDER_QUERY {
  order: SINGLE_ORDER_QUERY_order | null
}

export interface SINGLE_ORDER_QUERYVariables {
  id: string
}
