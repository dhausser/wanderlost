import { render, waitFor, cleanup, fakeItem } from '../lib/test-utils'

import { SINGLE_ITEM_QUERY, SingleItem } from '../components/SingleItem'

const item = fakeItem()
const mocks = [
  {
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: { id: '123' },
    },
    result: {
      data: {
        item,
      },
    },
  },
]

describe('<SingleItem/>', () => {
  afterEach(cleanup)

  it('renders loading state', () => {
    const { getByText } = render(<SingleItem id="123" />, {
      mocks,
      addTypename: false,
    })
    expect(getByText('Loading...')).toBeInTheDocument
  })

  it('renders with proper data', async () => {
    const { container, findByTestId, getByText } = render(
      <SingleItem id="123" />,
      {
        mocks,
        addTypename: false,
      }
    )

    expect(getByText('Loading...')).toBeInTheDocument

    await findByTestId('singleItem')
    await waitFor(() => getByText(`Viewing ${item.title}`))

    expect(getByText(`Viewing ${item.title}`)).toBeInTheDocument
    expect(container).toMatchSnapshot()
  })

  it('errors with a not found item', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        result: {
          errors: [{ message: 'Items Not Found!' }],
        },
      },
    ]
    const { container, findByTestId } = render(<SingleItem id="123" />, {
      mocks: mocks as any,
    })

    await findByTestId('graphql-error')
    expect(container).toHaveTextContent('Items Not Found!')
  })
})
