import React from 'react'
import { useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`

export default function(props) {
  const { id } = props
  const addToCart = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
  })
  return (
    <button type="button" onClick={addToCart}>
      Add to Cart 🛒
    </button>
  )
}
