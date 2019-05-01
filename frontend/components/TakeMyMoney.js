import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import calcTotalPrice from '../lib/calcTotalPrice'
import Error from './ErrorMessage'
import User, { CURRENT_USER_QUERY } from './User'

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)
}

function onToken(res) {
  console.log('On Token Called!')
  console.log(res.id)
}

export default props => (
  <User>
    {({ data: { me } }) => (
      <StripeCheckout
        amount={calcTotalPrice(me.cart)}
        name="Sick Fits"
        description={`Order of ${totalItems(me.cart)} items!`}
        // image={me.cart[0].item && me.cart[0].item.image}
        stripeKey="pk_test_zywrqZUXI6crPwbzolFxAyF100AF2Wh0HA"
        currency="USD"
        email={me.email}
        token={res => onToken(res)}
      >
        {props.children}
      </StripeCheckout>
    )}
  </User>
)
