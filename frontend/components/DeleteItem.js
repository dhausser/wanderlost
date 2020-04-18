/* eslint-disable no-alert */
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import { ALL_ITEMS_QUERY } from './Items';
import { PAGINATION_QUERY } from './Pagination';
import { perPage } from '../config';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

function DeleteItem({ id, children }) {
  const { query } = useRouter();
  // let page = 1;
  // let offset = 0;
  // if (query) {
  //   ({ page } = query);
  //   offset = page * perPage - perPage;
  // };

  const [deleteItem, { error }] = useMutation(DELETE_ITEM_MUTATION, {
    variables: { id },
    refetchQueries: [
      { query: ALL_ITEMS_QUERY },
      // { query: ALL_ITEMS_QUERY, variables: { offset } },
      { query: PAGINATION_QUERY }]
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
