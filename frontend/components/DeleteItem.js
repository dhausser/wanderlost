import React from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import { perPage } from '../config';

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;
function update(cache, payload) {
  // manually update the cache on the client so it matches the server
  // 1. Read the cache  for the items we want
  const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
  // 2. Filter the deleted item out of the page
  data.items = data.items.filter((item) => item.id !== payload.data.deleteItem.id);
  // 3. Put the items back!
  cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
}

export default function DeleteItem({ id, children }) {
  const [deleteItem, { error }] = useMutation(DELETE_ITEM_MUTATION);
  if (error) {
    return <Error error={error} />;
  }
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this?')) {
          deleteItem({
            variables: { id },
            update,
          }).catch((err) => {
            alert(err.message);
          });
        }
      }}
    >
      {children}
    </button>
  );
}

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};
