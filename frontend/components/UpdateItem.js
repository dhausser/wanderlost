import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

function UpdateItem({ id }) {
  const [title, setTitle] = useState('Cool shoes');
  const [description, setDescription] = useState('Cool shoes');
  const [price, setPrice] = useState(1000);

  const { data, loading } = useQuery(SINGLE_ITEM_QUERY, { variables: { id } });
  const [updateItemMutation, { error }] = useMutation(UPDATE_ITEM_MUTATION, {
    variables: {},
  });

  if (loading) return <p>Loading...</p>;
  if (!data.item) return <p>No Item Found for ID {id}</p>;
  return (
    <Form onSubmit={(e) => async function updateItem() {
      e.preventDefault();
      await updateItemMutation({
        variables: {
          id, title, description, price,
        },
      });
    }}
    >
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
              Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            defaultValue={data.item.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="price">
              Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            required
            defaultValue={data.item.price}
            onChange={(e) => setPrice(formatMoney(parseFloat(e.target.value)))}
          />
        </label>
        <label htmlFor="Description">
              Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter A Description"
            required
            defaultValue={data.item.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">
              Sav{loading ? 'ing' : 'e'} Changes
        </button>
      </fieldset>
    </Form>
  );
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
