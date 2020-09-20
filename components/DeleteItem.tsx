import { useMutation, gql } from '@apollo/client'
import Error from './ErrorMessage'
import { ALL_ITEMS_QUERY } from './Items'
import { PAGINATION_QUERY } from './Pagination'
import { DeleteItem as DeleteItemTypes, DeleteItemVariables } from './__generated__/DeleteItem'

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

function DeleteItem({ id, children }) {
  const [deleteItem, { error }] = useMutation<DeleteItemTypes, DeleteItemVariables>(DELETE_ITEM_MUTATION, {
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

export default DeleteItem
