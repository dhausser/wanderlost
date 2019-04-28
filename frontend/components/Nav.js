import Link from 'next/link'
import { useMutation } from 'react-apollo-hooks'
import { TOGGLE_CART_MUTATION } from './Cart'
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'

export default function() {
  const toggleCart = useMutation(TOGGLE_CART_MUTATION)
  return (
    <User>
      {({ data: { me } }) => (
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
              </button>
            </>
          )}
          {!me && (
            <Link href="/signup">
              <a>Signup</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
  )
}
