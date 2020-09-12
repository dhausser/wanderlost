import { createItem } from './createItem'
import { updateItem } from './updateItem'
import { deleteItem } from './deleteItem'
import { signup } from './signup'
import { signin } from './signin'
import { signout } from './signout'
import { requestReset } from './requestReset'
import { resetPassword } from './resetPassword'
import { updatePermissions } from './updatePermissions'
import { addToCart } from './addToCart'
import { deleteCartItem } from './deleteCartItem'
import { checkout } from './checkout'

export const Mutation = {
  createItem,
  updateItem,
  deleteItem,
  signup,
  signin,
  signout,
  requestReset,
  resetPassword,
  updatePermissions,
  addToCart,
  deleteCartItem,
  checkout,
}
