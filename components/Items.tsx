import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import Item from './Item'
import Pagination, { perPage } from './Pagination'
import { GetItems_items_items } from './__generated__/GetItems'

interface Props {
  page: number
}

export const ALL_ITEMS_QUERY = gql`
  # TODO: fix query variable
  # query ALL_ITEMS_QUERY($offset: Int = 0, $limit: Int = ${perPage}) {
  query GetItems($offset: Int = 0, $limit: Int = 4) {
    items(offset: $offset, limit: $limit) {
      items {
        id
        title
        price
        description
        image
        largeImage
      }
      hasMore
    }
  }
`

export const Center = styled.div`
  text-align: center;
`

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export default function Items({ page }: Props) {
  const { data, loading, error } = useQuery(ALL_ITEMS_QUERY, {
    variables: { offset: page * perPage - perPage },
  })

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <Center>
      <ItemsList>
        {data.items.items.map((item: GetItems_items_items) => (
          <Item key={item.id} item={item} />
        ))}
      </ItemsList>
      <Pagination page={page} />
    </Center>
  )
}
