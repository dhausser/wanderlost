import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import Head from 'next/head';
import Error from './ErrorMessage';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(id: $id) {
      id
      title
      description
      largeImage
    }
  }
`;

function SingleItem({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;
  if (!data.item) return <p>No Item Found for {id}</p>;

  return (
    <SingleItemStyles>
      <Head>
        <title>Wanderlost | {data.item.title}</title>
      </Head>
      <img src={data.item.largeImage} alt={data.item.title} />
      <div className="details">
        <h2>Viewing {data.item.title}</h2>
        <p>{data.item.description}</p>
      </div>
    </SingleItemStyles>
  );
}

export default SingleItem;
export { SINGLE_ITEM_QUERY };
