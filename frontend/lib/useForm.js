import { useState } from 'react';

const uploadFile = async ({ value, inputs, updateInputs }) => {
  console.log('Uploading file');
  const data = new FormData();
  data.append('file', value);
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
  updateInputs({
    ...inputs,
    image: file.secure_url,
    largeImage: file.eager[0].secure_url,
  })
};

export default function useForm(initial = {}) {
  const [inputs, updateInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
      uploadFile({ value, inputs, updateInputs });
    }
    updateInputs({
      ...inputs,
      [name]: e.target.value,
    });
  }

  function resetForm() {
    updateInputs(initial);
  }

  return {
    inputs,
    handleChange,
    resetForm
  };
}