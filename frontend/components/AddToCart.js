import React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { CURRENT_USER_QUERY } from './User'

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`

export default function({ id }) {
  return (
    <Mutation
      mutation={ADD_TO_CART_MUTATION}
      variables={{
        id,
      }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(addToCart, { loading }) => (
        <button type="button" disabled={loading} onClick={addToCart}>
          Add{loading && 'ing'} To Cart 🛒
        </button>
      )}
    </Mutation>
  )
}
