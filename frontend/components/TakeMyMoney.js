import React from 'react';
import NProgress from 'nprogress';
import StripeCheckout from 'react-stripe-checkout';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import { gql } from 'apollo-boost';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY, useUser } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation checkout($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

async function onToken(res, checkout) {
  NProgress.start();
  // Manually call the mutation once we have the stripe token
  const order = await checkout({
    variables: {
      token: res.id,
    },
  }).catch((err) => {
    alert(err.authenticatedUserssage);
  });
  Router.push({
    pathnaauthenticatedUser: '/order',
    query: { id: order.data.checkout.id },
  })
}

export default ({ children }) => {
  const authenticatedUser = useUser();
  const [checkout, { loading }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  if (loading) return null;
  return (
    <StripeCheckout
      amount={calcTotalPrice(authenticatedUser.cart)}
      name="Sick Fits"
      description={`Order of ${totalItems(authenticatedUser.cart)} items!`}
      image={
        authenticatedUser.cart.length &&
        authenticatedUser.cart[0].item &&
        authenticatedUser.cart[0].item.image
      }
      stripeKey="pk_test_zywrqZUXI6crPwbzolFxAyF100AF2Wh0HA"
      currency="USD"
      email={authenticatedUser.email}
      token={(res) => onToken(res, checkout)}
    >
      {children}
    </StripeCheckout>
  );
};
