import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton'
import SickButton from './styles/SickButton'

export const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`

export default () => {
  const toggleCart = useMutation(TOGGLE_CART_MUTATION)
  const { data } = useQuery(LOCAL_STATE_QUERY)
  return (
    <CartStyles open={data.cartOpen}>
      <header>
        <CloseButton onClick={toggleCart} title="close">
          &times;
        </CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You have __ Items in your cart.</p>
      </header>

      <footer>
        <p>$10.10</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </CartStyles>
  )
}
