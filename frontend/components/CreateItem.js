import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
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

const uploadFile = async (e) => {
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
  this.setState({
    image: file.secure_url,
    largeImage: file.eager[0].secure_url,
  });
};

function CreateItem() {
  const [title, setTitle] = useState('Cool shoes');
  const [description, setDescription] = useState('Cool shoes');
  const [image] = useState('dog.jpg');
  const [largeImage] = useState('large-dog.jpg');
  const [price, setPrice] = useState(1000);

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
            onChange={uploadFile}
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
            value={title}
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
            value={price}
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
            value={description}
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
