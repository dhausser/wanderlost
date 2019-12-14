import Link from 'next/link'
import { useMutation } from '@apollo/client'
import { TOGGLE_CART_MUTATION } from './Cart'
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'
import CartCount from './CartCount'

export default function() {
  const toggleCart = useMutation(TOGGLE_CART_MUTATION)
  return (
    <User>
      {({ data }) => {
        const me = data ? data.me : null
        return (
          <NavStyles>
            <Link href="/items">
              <a>Shop</a>
            </Link>
            {me && (
              <>
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
                <Link href="/orders">
                  <a>Orders</a>
                </Link>
                <Link href="/me">
                  <a>Account</a>
                </Link>
                <Signout />
                <button type="button" onClick={toggleCart}>
                  My Cart
                  <CartCount
                    count={me.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0,
                    )}
                  />
                </button>
              </>
            )}
            {!me && (
              <Link href="/signup">
                <a>Signup</a>
              </Link>
            )}
          </NavStyles>
        )
      }}
    </User>
  )
}
