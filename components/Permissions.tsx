import { useState, useEffect } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import Error from './ErrorMessage'
import Table from './styles/Table'
import SickButton from './styles/SickButton'
import { GetUsers } from './__generated__/GetUsers'

const possiblePermissions = ['USER', 'ADMIN', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE']

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UpdatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`

const ALL_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      name
      email
      permissions
    }
  }
`

const Permissions = () => {
  const { loading, error, data } = useQuery<GetUsers>(ALL_USERS_QUERY)
  if (loading) return <p>Loading...</p>
  return (
    <div>
      <Error error={error} />
      <div>
        <h2>Manage Permissions</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map((permission) => (
                <th key={permission}>{permission}</th>
              ))}
              <th>
                <span role="img" aria-label="finger-pointing-down">
                  👇
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <UserPermission user={user} key={user.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

function UserPermission({ user }) {
  const [permissions, setPermissions] = useState(user.permissions)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updatePermissions] = useMutation(UPDATE_PERMISSIONS_MUTATION, {
    variables: { permissions, userId: user.id },
  })
  useEffect(() => {
    async function update() {
      try {
        await updatePermissions()
        setLoading(false)
      } catch (e) {
        setError(e)
      }
    }
    update()
  }, [permissions])

  function handlePermissionChange(e) {
    const checkbox = e.target
    // take a copy of the current permission
    let updatedPermissions = [...permissions]
    // figure if we need to remove or add this permission
    if (checkbox.checked) {
      // add it in!
      updatedPermissions.push(checkbox.value)
    } else {
      updatedPermissions = updatedPermissions.filter((permission) => permission !== checkbox.value)
    }
    setLoading(true)
    setPermissions(updatedPermissions)
  }

  return (
    <>
      {error && (
        <tr>
          <td colSpan={8}>
            <Error error={error} />
          </td>
        </tr>
      )}
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map((permission) => (
          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                id={`${user.id}-permission-${permission}`}
                type="checkbox"
                checked={permissions.includes(permission)}
                value={permission}
                onChange={handlePermissionChange}
              />
            </label>
          </td>
        ))}
        <td>
          <SickButton type="button" disabled={loading} onClick={handlePermissionChange}>
            Updat{loading ? 'ing' : 'e'}
          </SickButton>
        </td>
      </tr>
    </>
  )
}

export default Permissions
