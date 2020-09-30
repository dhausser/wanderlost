import { MockedProvider } from '@apollo/react-testing'
import { render, fakeItem } from '../lib/test-utils'
import ItemComponent from '../components/Item'

const item = fakeItem()

describe('<Item/>', () => {
  test('renders and matches the snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <ItemComponent item={item} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })

  test('renders the image properly', () => {
    const { getByAltText } = render(
      <MockedProvider>
        <ItemComponent item={item} />
      </MockedProvider>
    )
    const img = getByAltText(item.title)
    expect(img).toBeInTheDocument()
  })

  test('renders the pricetag and title', () => {
    const { container, getByText } = render(
      <MockedProvider>
        <ItemComponent item={item} />
      </MockedProvider>
    )
    expect(getByText('$50')).toBeInTheDocument()
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '/item/abc123')
    expect(link).toHaveTextContent(item.title)
  })

  test('renders out the buttons properly', () => {
    const { getByText } = render(
      <MockedProvider>
        <ItemComponent item={item} />
      </MockedProvider>
    )

    const edit = getByText(/Edit/i)
    // @ts-expect-error href is not detected by typescript but test passes
    expect(edit.href).toContain('update?id=abc123')

    const addToCart = getByText(/add to cart/i)
    expect(addToCart).toHaveProperty('type', 'button')
    expect(addToCart).toBeInTheDocument()

    const deleteItem = getByText(/delete/i)
    expect(deleteItem).toHaveProperty('type', 'button')
    expect(deleteItem).toBeInTheDocument()
  })
})
