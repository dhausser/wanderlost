import {
  render,
  waitFor,
  userEvent,
  fakeUser,
  fakeCartItem,
} from '../lib/test-utils'

import { Cart } from '../components/Cart'
import { CURRENT_USER_QUERY } from '../components/User'
import { REMOVE_FROM_CART_MUTATION } from '../components/RemoveFromCart'
import { CartStateProvider } from '../components/LocalState'

const user = {
  // __typename: 'User',
  id: '4234',
  email: 'davy@prisma.io',
  name: 'Davy',
  permissions: ['ADMIN'],
  orders: [],
  cart: [],
  // cart: [fakeCartItem('omg123'), fakeCartItem('abc123')],
}

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        user,
      },
    },
  },
  // {
  //   request: { query: REMOVE_FROM_CART_MUTATION, variables: { id: 'omg123' } },
  //   result: {
  //     data: {
  //       deleteCartItem: { id: 'omg123' },
  //     },
  //   },
  // },
]

describe('<Cart/>', () => {
  it('renders and matches the snapshot', async () => {
    const { container, findByTestId } = render(
      <CartStateProvider>
        <Cart />
      </CartStateProvider>,
      { mocks, addTypename: false }
    )
    // await findByTestId('cart')
    await waitFor(() => {
      expect(container).toMatchSnapshot()
    })
  })
})

// describe('<RemoveFromCart/>', () => {
//   it('udpates when an item is removed', async () => {
//     const { container, findByTestId, getAllByTitle } = render(
//       <CartStateProvider>
//         <Cart />
//       </CartStateProvider>,
//       { mocks }
//     )
//     await findByTestId('cart')
//     expect(container).toHaveTextContent(/You have 2 items/i)
//     const deleteButtons = getAllByTitle(/Remove Item/i)
//     expect(deleteButtons).toHaveLength(2)
//     userEvent.click(deleteButtons[0])
//     const deleteButtonsUpdated = getAllByTitle(/Remove Item/i)
//     expect(container).toHaveTextContent(/You have 1 item/i)
//     expect(deleteButtonsUpdated).toHaveLength(1)
//   })
// })
