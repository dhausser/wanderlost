import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { ALL_ITEMS_QUERY } from './Items';
import { PAGINATION_QUERY } from './Pagination';
import { perPage } from '../config';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

function CreateItem() {
  const { inputs, handleChange } = useForm();
  const router = useRouter();
  // let page = 1;
  // if (router.query) ({ page } = router.query);

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    variables: inputs,
    // update(cache) {
    //   const { items: { items } } = cache.readQuery({ query: ALL_ITEMS_QUERY });
    //   cache.writeQuery({
    //     query: ALL_ITEMS_QUERY,
    //     data: { items: items.concat([{ ...inputs }]) },
    //   });
    // },
    refetchQueries: [
      { query: ALL_ITEMS_QUERY },
      { query: PAGINATION_QUERY }
    ]
  });

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(e)
        const res = await createItem();
        router.push({
          pathname: '/item',
          query: { id: res.data.createItem.id },
        });
      }}
    >
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
            required
            onChange={handleChange}
          />
          {inputs.image && (
            <img
              src={inputs.image}
              width="200"
              alt="Upload Preview"
            />
          )}
        </label>

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
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
