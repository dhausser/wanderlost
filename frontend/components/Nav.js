import Link from 'next/link';
import { useUser } from './User';
import { useCart } from './LocalState';
import NavStyles from './styles/NavStyles';
import Signout from './Signout';
import CartCount from './CartCount';
import Error from './ErrorMessage';

export default function () {
  const authenticatedUser = useUser();
  const { toggleCart } = useCart();
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
