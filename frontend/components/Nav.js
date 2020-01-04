import React from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from './styles/NavStyles';
import CURRENT_USER_QUERY from './User';
import Signout from './Signout';
import CartCount from './CartCount';
import Error from './ErrorMessage';

export default function () {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  const toggleCart = useMutation(TOGGLE_CART_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  const authenticatedUser = data ? data.authenticatedUser : null;

  return (
    <NavStyles>
      <Link href="/items">
        <a href="/items">Shop</a>
      </Link>
      {authenticatedUser && (
        <>
          <Link href="/sell">
            <a href="/sell">Sell</a>
          </Link>
          <Link href="/orders">
            <a href="/order">Orders</a>
          </Link>
          <Link href="/me">
            <a href="/me">Account</a>
          </Link>
          <Signout />
          <button type="button" onClick={toggleCart}>
                  My Cart
            <CartCount
              count={authenticatedUser.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0,
              )}
            />
          </button>
        </>
      )}
      {!authenticatedUser && (
      <Link href="/signup">
        <a href="/signup">Signup</a>
      </Link>
      )}
    </NavStyles>
  );
}
