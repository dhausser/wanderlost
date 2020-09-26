import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { ALL_ITEMS_QUERY } from './Items'
import { SINGLE_ITEM_QUERY } from './SingleItem'
import { GetItem, GetItemVariables } from './__generated__/GetItem'
import { UpdateItem as UpdateItemTypes, UpdateItemVariables } from './__generated__/UpdateItem'

type Inputs = Record<string, string>

const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItem($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`

function UpdateItem({ id }: UpdateItemVariables): JSX.Element {
  const router = useRouter()
  const { data, loading } = useQuery<GetItem, GetItemVariables>(SINGLE_ITEM_QUERY, {
    variables: { id },
  })
  const { register, handleSubmit, reset, errors } = useForm<Inputs>()

  useEffect(() => {
    if (data?.item) {
      const {
        item: { title, price, description },
      } = data
      reset({ title, price: price.toString(), description })
    }
  }, [data])

  const [updateItem, { loading: updating, error }] = useMutation<
    UpdateItemTypes,
    UpdateItemVariables
  >(UPDATE_ITEM_MUTATION, {
    refetchQueries: [{ query: ALL_ITEMS_QUERY }],
  })

  async function onSubmit(data: Inputs) {
    await updateItem({
      variables: {
        id,
        title: data.title,
        price: parseInt(data.price, 10),
        description: data.description,
      },
    })
    router.push('/item/[id]', `/item/${id}`)
  }

  if (loading) return <p>Loading...</p>
  if (!data || !data.item) {
    return <p>No Item Found for ID {id}</p>
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={updating}>
        <label>Title</label>
        <input name="title" ref={register({ required: true })} />
        {errors.title && <p>This is required</p>}

        <label>Price</label>
        <input name="price" type="number" ref={register({ required: true })} />
        {errors.price && <p>This is required</p>}

        <label>Description</label>
        <textarea name="description" ref={register({ required: true })} />
        {errors.description && <p>This is required</p>}

        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
      </fieldset>
    </Form>
  )
}

export default UpdateItem
export { UPDATE_ITEM_MUTATION }
