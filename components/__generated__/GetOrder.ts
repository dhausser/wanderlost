/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrder
// ====================================================

export interface GetOrder_order_user {
  __typename: 'User'
  id: string
}

export interface GetOrder_order_items {
  __typename: 'OrderItem'
  id: string
  title: string
  description: string
  price: number
  image: string
  quantity: number
}

export interface GetOrder_order {
  __typename: 'Order'
  id: string
  charge: string
  total: number
  createdAt: any
  user: GetOrder_order_user
  items: GetOrder_order_items[]
}

export interface GetOrder {
  order: GetOrder_order | null
}

export interface GetOrderVariables {
  id: string
}
