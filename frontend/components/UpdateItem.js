import { useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';
import Form from './styles/Form';
import Error from './ErrorMessage';
import useForm from '../lib/useForm';
import { ALL_ITEMS_QUERY } from './Items';
import { perPage } from '../config';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(id: $id) {
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

function UpdateItem() {
  const router = useRouter();
  const { id } = router.query;
  let page = 1;
  if (router.query) ({ page } = router.query);

  const { data, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id }
  });
  const { inputs, setInputs, handleChange } = useForm(data?.item);

  useEffect(() => {
    if (data?.item) {
      setInputs(data.item);
      // inputs.title = data.item.title;
      // inputs.price = data.item.price;
      // inputs.description = data.item.description;
    }
  }, [data])

  const [updateItem, { loading: updating, error }] = useMutation(
    UPDATE_ITEM_MUTATION,
    {
      variables: { id, ...inputs },
      refetchQueries: {
        query: ALL_ITEMS_QUERY,
        variables: { offset: page * perPage - perPage }
      }
    }
  );

  if (loading) return <p>Loading...</p>;
  if (!data || !data.item) {
    return <p>No Item Found for ID {id}</p>;
  }

  return (
    <Form onSubmit={async (e) => {
      e.preventDefault();
      await updateItem();
      router.push({
        pathname: '/item',
        query: { id },
      });
    }}
    >
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={updating}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            value={inputs.title}
            onChange={handleChange}
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
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter A Description"
            required
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
      </fieldset>
    </Form>
  );
}

UpdateItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
