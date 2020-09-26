import PrivateRoute from '../components/PrivateRoute'
import OrderList from '../components/OrderList'

const OrdersPage = (): JSX.Element => (
  <PrivateRoute>
    <OrderList />
  </PrivateRoute>
)

export default OrdersPage
