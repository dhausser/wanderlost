import React from 'react'
import { gql, useQuery } from '@apollo/client'

interface Props {
  name: string
}

// Make sure the query is also exported -- not just the component
export const GET_DOG_QUERY = gql`
  query GetDog($name: String) {
    dog(name: $name) {
      id
      name
      breed
    }
  }
`

export function Dog({ name }: Props): JSX.Element {
  const { loading, error, data } = useQuery(GET_DOG_QUERY, {
    variables: { name },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <p>
      {data.dog.name} is a {data.dog.breed}
    </p>
  )
}
