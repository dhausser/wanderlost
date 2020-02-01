import { gql } from 'apollo-server';

export default gql`
  type Query {
    items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, first: Int): [Item]!
    item(where: ItemWhereUniqueInput!): Item
    itemsConnection(where: ItemWhereInput): ItemConnection!
    authenticatedUser: User
    users: [User]!
    order(id: ID!): Order
    allOrders: [Order]!
  }

  type Mutation {
    createItem(title: String, description: String, price: Int, image: String, largeImage: String): Item!
    updateItem(id: ID!, title: String, description: String, price: Int): Item!
    deleteItem(id: ID!): Item
    signup(email: String!, password: String!, name: String!): User!
    signin(email: String!, password: String!): User!
    signout: SuccessMessage
    requestReset(email: String!): SuccessMessage
    resetPassword(resetToken: String!, password: String!, confirmPassword: String!): User!
    updatePermissions(permissions: [Permission], userId: ID!): User
    addToCart(id: ID!): CartItem
    deleteCartItem(id: ID!): CartItem
    checkout(token: String!): Order!
  }

  # type User {
  #   id: ID!
  #   name: String!
  #   email: String!
  #   permissions: [Permission!]!
  #   cart: [CartItem!]!
  #   orders: [OrderItem]
  # }
  
  type User {
    id: ID! @unique @id
    createdAt: DateTime! @createdAt
    updatedAt: DateTime! @updatedAt
    name: String!
    email: String! @unique
    password: String!
    resetToken: String
    resetTokenExpiry: Float
    permissions: [Permission] @scalarList(strategy: RELATION)
    cart: [CartItem!]!
  }

  type SuccessMessage {
    message: String
  }

  enum Permission {
    ADMIN
    USER
    ITEMCREATE
    ITEMUPDATE
    ITEMDELETE
    PERMISSIONUPDATE
  }

  type Item {
    id: ID! @unique @id
    createdAt: DateTime! @createdAt
    updatedAt: DateTime! @updatedAt
    title: String!
    description: String!
    image: String
    largeImage: String
    price: Int!
    user: User!
  }

  type CartItem {
    id: ID! @unique @id
    quantity: Int! @default(value: 1)
    item: Item # relationship to Item
    user: User! # relationship to User
  }

  type OrderItem {
    id: ID! @unique @id
    title: String!
    description: String!
    image: String!
    largeImage: String!
    price: Int!
    quantity: Int! @default(value: 1)
    user: User
  }

  type Order {
    id: ID! @unique @id
    items: [OrderItem!]!
    total: Int!
    user: User!
    charge: String!
    createdAt: DateTime! @createdAt
    updatedAt: DateTime! @updatedAt
  }
`;
