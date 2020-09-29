import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/react-testing'
import { useRouter } from 'next/router'
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem'
import { fakeItem } from '../lib/testUtils'

jest.mock('next/router', () => ({
  push: jest.fn(),
}))

const item = fakeItem()
describe('<CreateItem/>', () => {
  it('renders and matches snapshot', async () => {
    const { container } = render(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })

  it('handles state updating', async () => {
    render(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )

    await userEvent.type(screen.getByPlaceholderText('Name'), item.title)
    await userEvent.type(screen.getByPlaceholderText('Price'), item.price.toString())
    await userEvent.type(screen.getByPlaceholderText('Description'), item.description)

    await waitFor(() => {
      expect(screen.getByDisplayValue(item.title)).toBeInTheDocument()
      expect(screen.getByDisplayValue(item.price.toString())).toBeInTheDocument()
      expect(screen.getByDisplayValue(item.description)).toBeInTheDocument()
    })
  })
  it('creates an item when the form is submitted', async () => {
    const router = useRouter()
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
    await userEvent.type(screen.getByPlaceholderText('Name'), item.title)
    await userEvent.type(screen.getByPlaceholderText('Price'), item.price.toString())
    await userEvent.type(screen.getByPlaceholderText('Description'), item.description)
    // mock the router
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(router.push).toHaveBeenCalled()
      expect(router.push).toHaveBeenCalledWith({
        pathname: '/item',
        query: { id: 'abc123' },
      })
    })
  })
})
