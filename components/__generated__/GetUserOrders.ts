/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserOrders
// ====================================================

export interface GetUserOrders_orders_items {
  __typename: 'OrderItem'
  id: string
  title: string
  price: number
  description: string
  quantity: number
  image: string
}

export interface GetUserOrders_orders {
  __typename: 'Order'
  id: string
  total: number
  createdAt: any
  items: GetUserOrders_orders_items[]
}

export interface GetUserOrders {
  orders: (GetUserOrders_orders | null)[]
}
