import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CURRENT_USER_QUERY from './User';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import TakeMyMoney from './TakeMyMoney';
import Error from './ErrorMessage';

export const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

export default () => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  const localState = useQuery(LOCAL_STATE_QUERY);
  const toggleCart = useMutation(TOGGLE_CART_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  const { me } = data;
  if (!me) return null;
  return (
    <CartStyles open={localState.data.cartOpen}>
      <header>
        <CloseButton onClick={toggleCart} title="close">
                &times;
        </CloseButton>
        <Supreme>{me.name}'s Cart</Supreme>
        <p>
                You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in
                your cart.
        </p>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        {me.cart.length && (
        <TakeMyMoney>
          <SickButton>Checkout</SickButton>
        </TakeMyMoney>
        )}
      </footer>
    </CartStyles>
  );
};
