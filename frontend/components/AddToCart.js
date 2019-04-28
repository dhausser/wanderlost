import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo-hooks'
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

export default function(props) {
  const { id } = props
  const [loading, setLoading] = useState(false)
  const addToCart = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  useEffect(() => {
    async function add() {
      await addToCart()
      setLoading(false)
    }
    add()
  }, [loading])

  function handleAddToCart() {
    setLoading(true)
  }

  return (
    <button type="button" disabled={loading} onClick={handleAddToCart}>
      Add{loading && 'ing'} to Cart 🛒
    </button>
  )
}
