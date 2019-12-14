import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import StripeCheckout from 'react-stripe-checkout';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import CURRENT_USER_QUERY from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
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

async function onToken(res, createOrder) {
  console.log('On Token Called!');
  console.log(res.id);
  // Manually call the mutation once we have the stripe token
  const order = await createOrder({
    variables: {
      token: res.id,
    },
  }).catch((err) => {
    alert(err.message);
  });
  console.log(order);
}

export default ({ children }) => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  const { me } = data;

  return (
    <StripeCheckout
      amount={calcTotalPrice(me.cart)}
      name="Sick Fits"
      description={`Order of ${totalItems(me.cart)} items!`}
      image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
      stripeKey="pk_test_zywrqZUXI6crPwbzolFxAyF100AF2Wh0HA"
      currency="USD"
      email={me.email}
      token={(res) => onToken(res, createOrder)}
    >
      {children}
    </StripeCheckout>
  );
};
