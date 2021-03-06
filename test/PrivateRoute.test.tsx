import { render, fakeUser } from '../lib/test-utils'
import PrivateRoute from '../components/PrivateRoute'
import { CURRENT_USER_QUERY } from '../components/User'

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { user: null } },
  },
]

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { user: fakeUser() } },
  },
]

describe('<PrivateRoute/>', () => {
  test('renders the sign in dialog to logged out users', async () => {
    const Hey = () => <p>Hey!</p>
    const { container } = render(
      <PrivateRoute>
        <Hey />
      </PrivateRoute>,
      { mocks: notSignedInMocks }
    )

    expect(container).toHaveTextContent(/Sign into your/)
  })

  test('renders the child component when the user is signed in', async () => {
    const Hey = () => <p>Hey!</p>
    const { container, findByText } = render(
      <PrivateRoute>
        <Hey />
      </PrivateRoute>,
      { mocks: signedInMocks }
    )
    await findByText('Hey!')
    expect(container).toContainHTML('<p>Hey!</p>')
  })
})
