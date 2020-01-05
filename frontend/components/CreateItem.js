import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import useForm from '../lib/useForm';
import { gql } from 'apollo-boost';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

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

const uploadFile = async ({ e, setImage, setLargeImage }) => {
  console.log('Uploading file');
  const { files } = e.target;
  const data = new FormData();
  data.append('file', files[0]);
  data.append('upload_preset', 'sickfits');

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/davyhausser/image/upload',
    {
      method: 'POST',
      body: data,
    },
  );
  const file = await res.json();
  console.log(file);
  setImage(file.secure_url);
  setLargeImage(file.eager[0].secure_url);
};

function CreateItem() {
  // TODO: Remove the local state
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [largeImage, setLargeImage] = useState();
  const [price, setPrice] = useState();

  const { inputs, handleChange } = useForm({});

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    variables: {
      title, description, image, largeImage, price,
    },
  });

  return (
    <Form
      onSubmit={async (e) => {
        // Stop the form from submitting
        e.preventDefault();
        // Call the mutation
        const res = await createItem();
        // Change them to the single item page
        console.log(res);
        Router.push({
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
            onChange={(e) => uploadFile({
              e,
              setImage,
              setLargeImage
            })}
          />
          {image && (
            <img
              src={image}
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
            value={inputs.price}
            onChange={(e) => setPrice(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
