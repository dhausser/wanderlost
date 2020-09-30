import { render, screen, waitFor, fakeItem } from '../lib/test-utils'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/react-testing'
import Router from 'next/router'
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem'

const item = fakeItem()

describe('<CreateItem/>', () => {
  test('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })

  test('handles state updating', async () => {
    render(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )

    userEvent.type(screen.getByPlaceholderText('Title'), item.title)
    userEvent.type(screen.getByPlaceholderText('Price'), item.price.toString())
    userEvent.type(screen.getByPlaceholderText('Description'), item.description)

    await waitFor(() => {
      expect(screen.getByDisplayValue(item.title)).toBeInTheDocument()
      expect(
        screen.getByDisplayValue(item.price.toString())
      ).toBeInTheDocument()
      expect(screen.getByDisplayValue(item.description)).toBeInTheDocument()
    })
  })

  test('creates an item when the form is submitted', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            image: '',
            price: item.price,
          },
        },
        result: {
          data: {
            createItem: {
              ...item,
              id: 'abc123',
              __typename: 'Item',
            },
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks}>
        <CreateItem />
      </MockedProvider>
    )

    userEvent.type(screen.getByPlaceholderText('Title'), item.title)
    userEvent.type(screen.getByPlaceholderText('Price'), item.price.toString())
    userEvent.type(screen.getByPlaceholderText('Description'), item.description)
    userEvent.click(screen.getByText('Submit'))

    // TODO: await waitFor(() => {
    waitFor(() => {
      expect(Router.push).toHaveBeenCalled()
      expect(Router.push).toHaveBeenCalledWith({
        pathname: '/item',
        query: { id: 'abc123' },
      })
    })
  })
})
