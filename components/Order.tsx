import { useQuery, gql } from '@apollo/client'
import { format } from 'date-fns'
import Head from 'next/head'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import OrderStyles from './styles/OrderStyles'
import { GetOrder, GetOrderVariables } from './__generated__/GetOrder'

const SINGLE_ORDER_QUERY = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`

function Order({ id }) {
  const { loading, error, data } = useQuery<GetOrder, GetOrderVariables>(SINGLE_ORDER_QUERY, {
    variables: { id },
  })
  if (error) return <Error error={error} />
  if (loading) return <p>Loading...</p>
  const { order } = data
  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - Order {order.id}</title>
      </Head>
      <p>
        <span>Order ID:</span>
        <span>{id}</span>
      </p>
      <p>
        <span>Charge</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Date</span>
        <span>
          {order.createdAt}
          {format(new Date(order.createdAt), 'MMMM d, yyyy h:mm a')}
        </span>
      </p>
      <p>
        <span>Order Total</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h2>{item.title}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  )
}

export default Order
export { SINGLE_ORDER_QUERY }
