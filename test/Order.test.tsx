import { render } from '../lib/test-utils'
import Order from '../components/Order'

describe('<Order />', () => {
  it('renders navigation', () => {
    render(<Order id="123" />)
  })
})
