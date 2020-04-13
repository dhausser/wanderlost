import { gql } from 'apollo-server-express'

export default gql`
  enum Permission {
    ADMIN
    ITEMCREATE
    ITEMDELETE
    ITEMUPDATE
    PERMISSIONUPDATE
    USER
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    resetToken: String
    resetTokenExpiry: Float
    permissions: [Permission]
    cart: [CartItem!]!
    orders: [OrderItem]
  }

  type Item {
    id: ID!
    title: String!
    description: String!
    image: String
    largeImage: String
    price: Int!
    user: User!
  }

  type CartItem {
    id: ID!
    quantity: Int!
    item: Item
    user: User!
  }

  type OrderItem {
    id: ID!
    title: String!
    description: String!
    image: String!
    largeImage: String!
    price: Int!
    quantity: Int!
    user: User
  }

  type Order {
    id: ID!
    items: [OrderItem!]!
    total: Int!
    user: User!
    charge: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User]
    authenticatedUser: User
  }

  type UserInput {
    email: String!
    password: String!
    name: String!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): User!
    signin(email: String!, password: String!): User
  }
`
