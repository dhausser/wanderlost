import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';
import Head from 'next/head';
import { gql } from 'apollo-boost';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    orders {
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
`;

function Orders() {
  const { loading, error, data } = useQuery(ALL_ORDERS_QUERY);
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;
  const { orders } = data;
  console.log(orders);
  return (
    <p>Orders will be listed here</p>
    // <OrderStyles>
    //   <Head>
    //     <title>Sick Fits - Order {order.id}</title>
    //   </Head>
    //   <p>
    //     <span>Order ID:</span>
    //     <span>{id}</span>
    //   </p>
    //   <p>
    //     <span>Charge</span>
    //     <span>{order.charge}</span>
    //   </p>
    //   <p>
    //     <span>Date</span>
    //     <span>
    //       {format(new Date(order.createdAt), 'MMMM d, yyyy h:mm a', {
    //         awareOfUnicodeTokens: true,
    //       })}
    //     </span>
    //   </p>
    //   <p>
    //     <span>Order Total</span>
    //     <span>{formatMoney(order.total)}</span>
    //   </p>
    //   <p>
    //     <span>Item Count</span>
    //     <span>{order.items.length}</span>
    //   </p>
    //   <div className="items">
    //     {order.items.map((item) => (
    //       <div className="order-item" key={item.id}>
    //         <img src={item.image} alt={item.title} />
    //         <div className="item-details">
    //           <h2>{item.name}</h2>
    //           <p>Qty: {item.quantity}</p>
    //           <p>Each: {formatMoney(item.price)}</p>
    //           <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
    //           <p>{item.description}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </OrderStyles>
  );
}

export default Orders;
