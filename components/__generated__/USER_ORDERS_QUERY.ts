/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: USER_ORDERS_QUERY
// ====================================================

export interface USER_ORDERS_QUERY_orders_items {
  __typename: 'OrderItem'
  id: string
  title: string
  price: number
  description: string
  quantity: number
  image: string
}

export interface USER_ORDERS_QUERY_orders {
  __typename: 'Order'
  id: string
  total: number
  createdAt: any
  items: USER_ORDERS_QUERY_orders_items[]
}

export interface USER_ORDERS_QUERY {
  orders: (USER_ORDERS_QUERY_orders | null)[]
}
