import { render, userEvent, fakeUser, fakeCartItem } from '../lib/test-utils'

import { Cart } from '../components/Cart'
import { CURRENT_USER_QUERY } from '../components/User'
import { REMOVE_FROM_CART_MUTATION } from '../components/RemoveFromCart'
import { CartStateProvider } from '../components/LocalState'

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        authenticatedUser: {
          ...fakeUser(),
          cart: [fakeCartItem('omg123'), fakeCartItem('abc123')],
        },
      },
    },
  },
  {
    request: { query: REMOVE_FROM_CART_MUTATION, variables: { id: 'omg123' } },
    result: {
      data: {
        deleteCartItem: { id: 'omg123' },
      },
    },
  },
]

describe('<Cart/>', () => {
  it('renders and matches snappy', async () => {
    const { container, findByTestId } = render(
      <CartStateProvider>
        <Cart />
      </CartStateProvider>,
      { mocks }
    )
    await findByTestId('cart')
    expect(container).toMatchSnapshot()
  })
})
