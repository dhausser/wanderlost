import {
  render,
  fireEvent,
  screen,
  waitFor,
  userEvent,
  fakeUser,
} from '../lib/test-utils'
import { SIGNUP_MUTATION, Signup } from '../components/Signup'
import { CURRENT_USER_QUERY } from '../components/User'

const me = fakeUser()
const mocks = [
  // signup mock mutation
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password: 'wes',
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
    result: { data: { authenticatedUser: me } },
  },
]

describe('<Signup/>', () => {
  it('renders and matches snapshot', async () => {
    const { container } = render(<Signup />)
    expect(container).toMatchSnapshot()
  })

  it('renders without error', () => {
    render(<Signup />, { mocks: [] })
  })

  it('should render loading state initially', async () => {
    const component = render(<Signup />, { mocks })

    // find the button and simulate a click
    const button = await component.findByRole('button')
    waitFor(() => {
      fireEvent.click(button) // fires the mutation
    })

    expect(screen.getByTestId('loading')).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByTestId('loading')).not.toHaveAttribute('disabled')
  })

  it('calls the mutation properly', () => {
    render(<Signup />, { mocks })
    userEvent.type(screen.getByPlaceholderText('name'), me.name)
    userEvent.type(screen.getByPlaceholderText('email'), me.email)
    userEvent.type(screen.getByPlaceholderText('password'), 'wes')

    expect(screen.getByTestId('loading')).toHaveAttribute('aria-busy', 'false')
    expect(screen.getByTestId('loading')).not.toHaveAttribute('disabled')

    waitFor(() => {
      // userEvent.click(screen.getByText('Sign Up!'))
      fireEvent.click(screen.getByText('Sign Up!'))
    })

    // await new Promise((resolve) => setTimeout(resolve, 0)) // wait for response

    // waitFor(() => {
    // expect(screen.getByTestId('loading')).toHaveAttribute('aria-busy', 'true')
    // expect(screen.getByTestId('loading')).toHaveAttribute('disabled')
    // })

    // loading state
    // waitFor(() => {
    //   expect(screen.getByTestId('loading')).toHaveAttribute('aria-busy', 'true')
    //   expect(screen.getByTestId('loading')).toHaveAttribute('disabled')
    // })
    // screen.findByText(`Signed up with ${me.email} — Please Sign In now`)
  })
})
