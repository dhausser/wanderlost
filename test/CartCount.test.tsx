import { render } from '@testing-library/react'
import CartCount from '../components/CartCount'

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount))

describe('<CartCount/>', () => {
  test('renders', () => {
    render(<CartCount count={10} />)
  })

  test('matches the snapshot', () => {
    const { container } = render(<CartCount count={11} />)
    expect(container).toMatchSnapshot()
  })

  test('updates via props', async () => {
    const { container, rerender } = render(<CartCount count={11} />)
    expect(container.textContent).toBe('11')
    rerender(<CartCount count={12} />)
    expect(container.textContent).toBe('1211')
    await wait(500)
    expect(container.textContent).toBe('12')
    expect(container).toMatchSnapshot()
  })
})
