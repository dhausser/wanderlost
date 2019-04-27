import React from 'react'
import { Query } from 'react-apollo'

export default ({ children, ...props }) => (
  <Query {...props}>
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>
      }
      if (error) {
        return <p>Error: {error.message}</p>
      }
      return children(data)
    }}
  </Query>
)
