import { useQuery, gql } from '@apollo/client'
import { GetCurrentUser } from './__generated__/GetCurrentUser'

const CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    user {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`

function useUser() {
  const { data } = useQuery<GetCurrentUser>(CURRENT_USER_QUERY)
  if (data) {
    return data.user
  }
  return null
}

export { CURRENT_USER_QUERY, useUser }
