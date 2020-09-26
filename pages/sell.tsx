import CreateItem from '../components/CreateItem'
import PrivateRoute from '../components/PrivateRoute'

const Sell = (): JSX.Element => (
  <PrivateRoute>
    <CreateItem />
  </PrivateRoute>
)

export default Sell
