const { gql } = require('apollo-server')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
module.exports = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    id: ID!
    name: String!
    email: String!
    # permissions: [Permission!]!
    # cart: [CartItem!]!
    # orders: [OrderItem]
  }

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    users: [User]
  }

  type UserInput {
    email: String!
    password: String!
    name: String!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): User!
  }
`

// type User {
//   id: ID!
//   name: String!
//   email: String!
//   permissions: [Permission!]!
//   cart: [CartItem!]!
//   orders: [OrderItem]
// }

// type Query {
//   items: [Item]!
//   item: Item
//   itemsConnection: ItemConnection!
//   authenticatedUser: User
//   users: [User]!
//   order(id: ID!): Order
//   orders: [Order]!
// }

// type Mutation {
//   createItem(
//     title: String!
//     description: String!
//     price: Int!
//     image: String
//     largeImage: String
//   ): Item!
//   updateItem(id: ID!, title: String, description: String, price: Int): Item!
//   deleteItem(id: ID!): Item
//   signup(email: String!, password: String!, name: String!): User!
//   signin(email: String!, password: String!): User!
//   signout: SuccessMessage
//   requestReset(email: String!): SuccessMessage
//   resetPassword(
//     resetToken: String!
//     password: String!
//     confirmPassword: String!
//   ): User!
//   updatePermissions(permissions: [Permission], userId: ID!): User
//   addToCart(id: ID!): CartItem
//   deleteCartItem(id: ID!): CartItem
//   checkout(token: String!): Order!
// }

// type SuccessMessage {
//   message: String
// }
