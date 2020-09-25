import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'

// TODO: strict type safety for inputs
type Inputs = Record<string, any>

type Event = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface Form {
  inputs: Inputs
  setInputs: Dispatch<SetStateAction<Inputs>>
  handleChange: (event: Event) => void
  resetForm: () => void
  clearForm: () => void
}

interface FileUploadProps {
  value: string
  inputs: Inputs
  setInputs: Dispatch<SetStateAction<Inputs>>
}

// TODO: upgrade to cloudinary v2 SDK
async function uploadFile({ value, inputs, setInputs }: FileUploadProps) {
  const data = new FormData()
  data.append('file', value)
  // TODO: configure upload present for wanderlost instead of sickfits
  data.append('upload_preset', 'sickfits')

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/davyhausser/image/upload',
    {
      method: 'POST',
      body: data,
    }
  )
  const file = await res.json()
  setInputs({
    ...inputs,
    image: file.secure_url,
    largeImage: file.eager[0].secure_url,
  })
}

export default function useForm(initial: Inputs): Form {
  const [inputs, setInputs] = useState(initial)

  function handleChange(e: {
    target: { files?: any; name?: any; type?: any; value?: any }
  }) {
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
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    )
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
