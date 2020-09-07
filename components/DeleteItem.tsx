/* eslint-disable no-alert */
import { useMutation, gql } from '@apollo/client'
import PropTypes from 'prop-types'
import Error from './ErrorMessage'
import { ALL_ITEMS_QUERY } from './Items'
import { PAGINATION_QUERY } from './Pagination'
const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

function DeleteItem({ id, children }) {
  const [deleteItem, { error }] = useMutation(DELETE_ITEM_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: ALL_ITEMS_QUERY }, { query: PAGINATION_QUERY }],
  })

  if (error) {
    return <Error error={error} />
  }

  return (
    <button
      type="button"
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this?')) {
          deleteItem().catch((err) => {
            alert(err.message)
          })
        }
      }}
    >
      {children}
    </button>
  )
}

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
}

DeleteItem.defaultProps = {
  children: [],
}

export default DeleteItem
