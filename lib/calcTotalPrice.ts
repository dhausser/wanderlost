import { GetCurrentUser_user_cart } from '../components/__generated__/GetCurrentUser'

export default function calcTotalPrice(
  cart: Array<GetCurrentUser_user_cart>
): number {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.item) return tally
    return tally + cartItem.quantity * cartItem.item.price
  }, 0)
}
