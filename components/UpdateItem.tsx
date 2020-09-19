import { useEffect } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Form from './styles/Form'
import Error from './ErrorMessage'
import useForm from '../lib/useForm'
import { ALL_ITEMS_QUERY } from './Items'
import { SINGLE_ITEM_QUERY } from './SingleItem'

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`

function UpdateItem({ id }) {
  const router = useRouter()
  const { data, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  })
  const { inputs, setInputs, handleChange } = useForm(data?.item)

  useEffect(() => {
    if (data?.item) {
      setInputs(data.item)
    }
  }, [data])

  const [updateItem, { loading: updating, error }] = useMutation(UPDATE_ITEM_MUTATION, {
    variables: { id, ...inputs },
    refetchQueries: [
      {
        query: ALL_ITEMS_QUERY,
      },
    ],
  })

  if (loading) return <p>Loading...</p>
  if (!data || !data.item) {
    return <p>No Item Found for ID {id}</p>
  }

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault()
        await updateItem()
        router.push('/item/[id]', `/item/${id}`)
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
  )
}

export default UpdateItem
export { UPDATE_ITEM_MUTATION }
