import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import User from './User'
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton'
import SickButton from './styles/SickButton'
import CartItem from './CartItem'
import calcTotalPrice from '../lib/calcTotalPrice'
import formatMoney from '../lib/formatMoney'

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
  const {
    data: { cartOpen },
  } = useQuery(LOCAL_STATE_QUERY)
  return (
    <User>
      {({ data }) => {
        const me = data ? data.me : null
        if (!me) return null
        return (
          <CartStyles open={cartOpen}>
            <header>
              <CloseButton onClick={toggleCart} title="close">
                &times;
              </CloseButton>
              <Supreme>{me.name}'s Cart</Supreme>
              <p>
                You have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'}{' '}
                in your cart.
              </p>
            </header>
            <ul>
              {me.cart.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
            <footer>
              <p>{formatMoney(calcTotalPrice(me.cart))}</p>
              <SickButton>Checkout</SickButton>
            </footer>
          </CartStyles>
        )
      }}
    </User>
  )
}
