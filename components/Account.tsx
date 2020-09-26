import { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useUser } from './User'
import { useForm } from 'react-hook-form'
import Form from './styles/Form'
import PrivateRoute from './PrivateRoute'
import { UpdateUser, UpdateUserVariables } from './__generated__/UpdateUser'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($name: String!, $id: ID!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`

function Account() {
  const defaultValues = { name: '' }
  const me = useUser()
  const { register, handleSubmit, reset, errors } = useForm({ defaultValues })
  const [updateUser, { loading }] = useMutation<UpdateUser, UpdateUserVariables>(
    UPDATE_USER_MUTATION
  )

  useEffect(() => {
    reset({ name: me?.name })
  }, [me])

  async function onSubmit(data: UpdateUserVariables) {
    if (me) {
      await updateUser({
        variables: {
          id: me.id,
          name: data.name,
        },
      })
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading}>
        <input name="name" ref={register({ required: true })} />
        {errors.email && <p>This is required</p>}
        <button type="submit">Updat{loading ? 'ing' : 'e'}</button>
      </fieldset>
    </Form>
  )
}

function Component(): JSX.Element {
  return (
    <PrivateRoute>
      <Account />
    </PrivateRoute>
  )
}

export default Component
