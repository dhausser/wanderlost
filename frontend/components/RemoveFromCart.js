import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
`;
export default function RemoveFromCart({ id }) {
  function update(cache, payload) {
    // This gets called as soon as we get a response back
    // from the server after a mutation has been performed
    // 1. first read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    // 2. remove that item from the cart
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter((cartItem) => cartItem.id !== cartItemId);
    // 3. write it back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  }

  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION);

  return (
    <BigButton
      disabled={loading}
      onClick={() => {
        removeFromCart({
          variables: { id },
          update,
          optimisticResponse: {
            __typename: 'Mutation',
            removeFromCart: {
              __typename: 'CartItem',
              id,
            },
          },
        }).catch((err) => alert(err.message));
      }}
      title="Delete Item"
    >
      &times;
    </BigButton>
  );
}

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};
