import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'

type Inputs = Record<string, string>
type Event = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type Form = {
  inputs: Inputs
  setInputs: Dispatch<SetStateAction<Inputs>>
  handleChange: (event: Event) => void
  resetForm: () => void
  clearForm: () => void
}

async function uploadFile({ value, inputs, setInputs }) {
  const data = new FormData()
  data.append('file', value)
  data.append('upload_preset', 'sickfits')

  const res = await fetch('https://api.cloudinary.com/v1_1/davyhausser/image/upload', {
    method: 'POST',
    body: data,
  })
  const file = await res.json()
  setInputs({
    ...inputs,
    image: file.secure_url,
    largeImage: file.eager[0].secure_url,
  })
}

export default function useForm(initial = {}): Form {
  const [inputs, setInputs] = useState(initial)

  function handleChange(e: { target: { files?: any; name?: any; type?: any; value?: any } }) {
    const { name, type } = e.target
    let { value } = e.target
    if (type === 'number') {
      value = parseInt(value, 10)
    }
    if (type === 'file') {
      [value] = e.target.files
      uploadFile({ value, inputs, setInputs })
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  function resetForm() {
    setInputs(initial)
  }

  function clearForm() {
    const blankState = Object.fromEntries(Object.entries(inputs).map(([key]) => [key, '']))
    setInputs(blankState)
  }

  return {
    inputs,
    setInputs,
    handleChange,
    resetForm,
    clearForm,
  }
}
