import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
// import { render, screen, waitFor, fakeItem } from '../lib/test-utils'

import { SINGLE_ITEM_QUERY, SingleItem } from '../components/SingleItem'

// const item = fakeItem()

const mocks = [
  {
    // when someone makes a request with this query and variable combo
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: { id: '123' },
    },
    // return this fake data (mocked data)
    result: {
      data: {
        item: {
          __typename: 'Item',
          id: '123',
          title: 'title',
          price: 10,
          description: 'description',
          image: 'item-small.jpg',
          largeImage: 'item.jpg',
        },
      },
    },
  },
]

describe('<SingleItem/>', () => {
  it('renders without error', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SingleItem id="123" />
      </MockedProvider>
    )
  })

  test('it renders loading state', () => {
    const { container, getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SingleItem id="123" />
      </MockedProvider>
    )
    // const text = getByText('Loading...')
    // // expect(text).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  // it('renders with proper data', async () => {
  //   const { container, findByTestId } = render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <SingleItem id="123" />
  //     </MockedProvider>
  //   )
  //   await findByTestId('singleItem')
  //   // await new Promise((resolve) => setTimeout(resolve, 0)) // wait for response
  //   expect(container).toMatchSnapshot()
  // })

  // test('renders with proper data', async () => {
  //   const item = {
  //     __typename: 'Item',
  //     id: 'abc123',
  //     title: 'dogs are best',
  //     price: 5000,
  //     description: 'dogs',
  //     image: 'dog-small.jpg',
  //     largeImage: 'dog.jpg',
  //   }
  //   const mocks = [
  //     {
  //       // when someone makes a request with this query and variable combo
  //       request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
  //       // return this fake data (mocked data)
  //       result: {
  //         data: {
  //           item,
  //         },
  //       },
  //     },
  //   ]
  //   const { container, findByTestId, getByText } = render(
  //     <SingleItem id="123" />,
  //     {
  //       mocks,
  //     }
  //   )

  //   await waitFor(() => {
  //     console.log(container)

  //     expect(getByText(item.title)).toBeInTheDocument()
  //   })

  //   // expect(container).toMatchSnapshot()
  // })

  // test('Errors with a not found item', async () => {
  //   const mocks = [
  //     {
  //       request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
  //       result: {
  //         errors: [{ message: 'Items Not Found!' }],
  //       },
  //     },
  //   ]
  //   const { container, findByTestId } = render(<SingleItem id="123" />, {
  //     mocks,
  //   })

  //   await findByTestId('graphql-error')
  //   expect(container).toHaveTextContent('Items Not Found!')
  // })
})
