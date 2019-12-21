/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = (props) => {
  const { data, loading } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;

  const { count } = data.itemsConnection.aggregate;
  const pages = Math.ceil(count / perPage);
  const { page } = props;
  return (
    <PaginationStyles>
      <Head>
        <title>
              Sick Fits! Page {page} of {pages}
        </title>
      </Head>
      <Link
        href={{
          pathname: 'items',
          query: { page: page - 1 },
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
              ← Prev
        </a>
      </Link>
      <p>
        {page} of {pages}
      </p>
      <p>{count} Items Total</p>
      <Link
        href={{
          pathname: 'items',
          query: { page: page + 1 },
        }}
      >
        <a className="prev" aria-disabled={page >= pages}>
              Next →
        </a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
