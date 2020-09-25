import { useCart } from './LocalState'
import { useUser } from './User'
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton'
import CartItem from './CartItem'
import formatMoney from '../lib/formatMoney'
import Checkout from './Checkout'
import { GetCurrentUser_user_cart } from './__generated__/GetCurrentUser'

function calcTotalPrice(cart: Array<GetCurrentUser_user_cart>) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.item) return tally
    return tally + cartItem.quantity * cartItem.item.price
  }, 0)
}

function Cart() {
  let totalItems = 0
  const user = useUser()
  const { cartOpen, toggleCart } = useCart()
  if (!user) return null

  totalItems = user.cart.reduce((acc, current) => {
    return (acc = acc + current.quantity)
  }, 0)

  return (
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton onClick={toggleCart} title="close">
          &times;
        </CloseButton>
        <Supreme>{`${user.name}'s Cart`}</Supreme>
        <p>
          You Have {totalItems} Item{totalItems === 1 ? '' : 's'} in your cart.
        </p>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      {user.cart.length && (
        <footer>
          <p>{formatMoney(calcTotalPrice(user.cart))}</p>
          <Checkout />
        </footer>
      )}
    </CartStyles>
  )
}

export default Cart
