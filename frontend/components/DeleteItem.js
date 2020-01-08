import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import { perPage } from '../config';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
    }
  }
`;

function DeleteItem({ id, children }) {
  const [deleteItem, { error }] = useMutation(DELETE_ITEM_MUTATION, {
    variables: { id },
    // eslint-disable-next-line no-shadow
    update(cache, { data: { deleteItem } }) {
      const { items } = cache.readQuery({ query: ALL_ITEMS_QUERY });
      cache.writeQuery({
        query: ALL_ITEMS_QUERY,
        data: { items: items.filter((item) => item.id !== deleteItem.id) },
      });
    },
  });

  if (error) {
    return <Error error={error} />;
  }

  return (
    <button
      type="button"
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this?')) {
          deleteItem().catch((err) => {
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

DeleteItem.defaultProps = {
  children: [],
};

export default DeleteItem;
