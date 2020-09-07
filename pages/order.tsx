import { useRouter } from 'next/router'
import PrivateRoute from '../components/PrivateRoute'
import Order from '../components/Order'

const OrderPage = () => {
  const { query } = useRouter()
  return (
    <PrivateRoute>
      <Order id={query.id as string} />
    </PrivateRoute>
  )
}

export default OrderPage
