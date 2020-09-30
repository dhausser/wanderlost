import { render, fakeUser } from '../lib/test-utils'
import SignUp, { SIGNUP_MUTATION } from '../components/Signup'
import { CURRENT_USER_QUERY } from '../components/User'

const me = fakeUser()
const mocks = [
  // signup mock mutation
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        name: me.name,
        password: 'test',
      },
    },
    result: {
      data: {
        signup: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // current user query mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } },
  },
]

describe('<Signup/>', () => {
  test('renders and matches snapshot', async () => {
    const { container } = render(<SignUp />)
    expect(container).toMatchSnapshot()
  })
})
