import React from 'react';
import { gql, useMutation } from '@apollo/client';
import CURRENT_USER_QUERY from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

export default function ({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button type="button" disabled={loading} onClick={addToCart}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
}
