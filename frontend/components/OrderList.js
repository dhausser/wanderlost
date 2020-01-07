import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { formatDistance } from 'date-fns';
import { gql } from 'apollo-boost';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderItemStyles from './styles/OrderItemStyles';

const USER_ORDERS_QUERY = gql`
  query {
    allOrders {
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
`;

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

function OrderList() {
  const { loading, error, data } = useQuery(USER_ORDERS_QUERY);
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;
  const { allOrders } = data;
  return (
    <div>
      <h2>You have {allOrders.length} orders</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link
              href={{
                pathname: '/order',
                query: { id: order.id },
              }}
            >
              <a href={{
                pathname: '/order',
                query: { id: order.id },
              }}
              >
                <div className="order-meta">
                  <p>{order.items.reduce((a, b) => a + b.quantity, 0)} Items</p>
                  <p>{order.items.length} Products</p>
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
  );
}

export default OrderList;
