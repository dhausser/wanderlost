import { render, userEvent } from '../lib/test-utils'
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset'

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: 'davy.hausser@gmail.com' },
    },
    result: {
      data: { requestReset: { message: 'success', __typename: 'Message' } },
    },
  },
]

describe('<RequestReset/>', () => {
  test('renders and matches snapshot', async () => {
    const { container } = render(<RequestReset />)
    expect(container).toMatchSnapshot()
  })

  test('calls the mutation', async () => {
    const {
      container,
      getByText,
      getByPlaceholderText,
      findByText,
    } = render(<RequestReset />, { mocks: mocks })

    userEvent.type(getByPlaceholderText('email'), 'davy.hausser@gmail.com')
    userEvent.click(getByText(/Request Reset/i))
    const success = await findByText(/Success/i)
    expect(success).toBeInTheDocument()
    const text = container.querySelector('p')?.innerHTML
    expect(text).toContain('Success! Check your email for a reset link!')
  })
})
