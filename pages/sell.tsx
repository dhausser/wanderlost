import CreateItem from '../components/CreateItem'
import PrivateRoute from '../components/PrivateRoute'
import Layout from '../components/Layout'

const Sell = () => (
  <PrivateRoute>
    <CreateItem />
  </PrivateRoute>
)

export default Sell
