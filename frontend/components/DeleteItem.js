import React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'
import { ALL_ITEMS_QUERY } from './Items'
import Error from './ErrorMessage'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`
function update(cache, payload) {
  // manually update the cache on the client so it matches the server
  // 1. Read the cache  for the items we want
  const data = cache.readQuery({ query: ALL_ITEMS_QUERY })
  // 2. Filter the deleted item out of the page
  data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)
  // 3. Put the items back!
  cache.writeQuery({ query: ALL_ITEMS_QUERY, data })
}

export default function DeleteItem(props) {
  return (
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{ id: props.id }}
      update={update}
    >
      {(deleteItem, { error }) => {
        if (error) {
          return <Error error={error} />
        }
        return (
          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to delete this?')) {
                deleteItem().catch(err => {
                  alert(err.message)
                })
              }
            }}
          >
            {props.children}
          </button>
        )
      }}
    </Mutation>
  )
}

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
}
