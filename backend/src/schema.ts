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

  type ItemConnection {
    items: [Item]!
    total: Int!
    hasMore: Boolean!
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

  type UserInput {
    email: String!
    password: String!
    name: String!
  }

  type Query {
    items(offset: Int, limit: Int): ItemConnection!
    item(id: ID!): Item
    user: User
    users: [User]
    order(id: ID!): Order
    orders: [Order]!
  }

  type Mutation {
    createItem(
      title: String!
      description: String!
      price: Int!
      image: String
      largeImage: String
    ): Item!
    updateItem(id: ID!, title: String, description: String, price: Int): Item!
    deleteItem(id: ID!): Item
    signup(email: String!, password: String!, name: String!): User!
    signin(email: String!, password: String!): User
    signout: String
    requestReset(email: String!): String
    resetPassword(resetToken: String!, password: String!, confirmPassword: String!): User!
    updatePermissions(permissions: [Permission], userId: ID!): User
    addToCart(id: ID!): CartItem
    removeFromCart(id: ID!): CartItem
    createOrder(token: String!): Order!
  }
`
