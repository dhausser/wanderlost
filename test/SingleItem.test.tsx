import { MockedProvider } from '@apollo/react-testing'
import { render, fakeItem } from '../lib/test-utils'
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem'

const item = fakeItem()
describe('<SingleItem/>', () => {
  test('renders with proper data', async () => {
    const mocks = [
      {
        // when someone makes a request with this query and variable combo
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        // return this fake data (mocked data)
        result: {
          data: {
            Item: item,
          },
        },
      },
    ]
    const { container, findByTestId } = render(
      <MockedProvider mocks={mocks}>
        <SingleItem item={item} />
      </MockedProvider>
    )
    await findByTestId('singleItem')
    expect(container).toMatchSnapshot()
  })

  // test('Errors with a not found item', async () => {
  //   const mocks = [
  //     {
  //       request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
  //       result: {
  //         errors: [{ message: 'Items Not Found!' }],
  //       },
  //     },
  //   ]
  //   const { container } = render(
  //     <MockedProvider mocks={mocks}>
  //     <SingleItem item={item} />
  //     </MockedProvider>
  //   )

  //   await screen.findByTestId('graphql-error')
  //   expect(container).toHaveTextContent('Items Not Found!')
  // })
})
