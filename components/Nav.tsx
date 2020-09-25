import Link from 'next/link'
import { useUser } from './User'
import { useCart } from './LocalState'
import NavStyles from './styles/NavStyles'
import Signout from './Signout'
import CartCount from './CartCount'

function Nav() {
  const me = useUser()
  const { toggleCart } = useCart()
  return (
    <NavStyles>
      <Link href="/items">
        <a href="/items">Shop</a>
      </Link>
      {me && (
        <>
          <Link href="/sell">
            <a href="/sell">Sell</a>
          </Link>
          <Link href="/orders">
            <a href="/orders">Orders</a>
          </Link>
          <Link href="/account">
            <a href="/account">Account</a>
          </Link>
          <Signout />
          <button type="button" onClick={toggleCart}>
            My Cart
            <CartCount
              count={me.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {!me && (
        <Link href="/signup">
          <a href="/signup">Signup</a>
        </Link>
      )}
    </NavStyles>
  )
}

export default Nav
