import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';

const perPage = process.env.perPage

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($offset: Int = 0, $limit: Int = ${perPage}) {
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
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default function Items({ page }) {
  const { data, loading, error } = useQuery(ALL_ITEMS_QUERY, {
    variables: { offset: page * perPage - perPage },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Center>
      <ItemsList>
        {data.items.items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ItemsList>
      <Pagination page={page} />
    </Center>
  );
}
