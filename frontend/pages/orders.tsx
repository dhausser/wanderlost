import PrivateRoute from '../components/PrivateRoute'
import OrderList from '../components/OrderList'

const OrdersPage = () => (
  <PrivateRoute>
    <OrderList />
  </PrivateRoute>
)

export default OrdersPage
