import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'
import { formatDistance } from 'date-fns'
import styled from 'styled-components'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import OrderItemStyles from './styles/OrderItemStyles'
import { GetUserOrders } from './__generated__/GetUserOrders'

export const USER_ORDERS_QUERY = gql`
  query GetUserOrders {
    orders {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`

function OrderList() {
  const { loading, error, data } = useQuery<GetUserOrders>(USER_ORDERS_QUERY)
  if (error) return <Error error={error} />
  if (loading) return <p>Loading...</p>
  const { orders } = data
  return (
    <div>
      <h2>You have {orders.length} orders</h2>
      <OrderUl>
        {orders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link
              href={{
                pathname: '/order',
                query: { id: order.id },
              }}
            >
              <a href="/order/[id]">
                <div className="order-meta">
                  <p>{order.items.reduce((a, b) => a + b.quantity, 0)} Items</p>
                  <p>{order.items.length} Products</p>
                  <p>{order.createdAt}</p>
                  <p>{formatDistance(new Date(order.createdAt), new Date())}</p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img key={item.id} src={item.image} alt={item.title} />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  )
}

export default OrderList
