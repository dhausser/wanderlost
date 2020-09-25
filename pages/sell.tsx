import CreateItem from '../components/CreateItem'
import PrivateRoute from '../components/PrivateRoute'

const Sell = () => (
  <PrivateRoute>
    <CreateItem />
  </PrivateRoute>
)

export default Sell
