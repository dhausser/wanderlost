import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'

type Inputs = Record<string, string>

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

export default function useForm(initial: Inputs): Form {
  const [inputs, setInputs] = useState(initial)

  function handleChange(e: Event) {
    const { name, type } = e.target
    let { value } = e.target

    // if (type === 'number') {
    // value = parseInt(value, 10)
    // }

    if (type === 'file') {
      // value = e.target.files[0]
      const target = e.target as HTMLInputElement
      const file: File = (target.files as FileList)[0]
      value = String(file)
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
