import { render } from '../lib/test-utils'
import Pagination from '../components/Pagination'

describe('<Pagination />', () => {
  it('renders navigation', () => {
    render(<Pagination page={1} />)
  })
})
