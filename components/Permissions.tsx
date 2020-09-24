import { useState, useEffect } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import Error from './ErrorMessage'
import Table from './styles/Table'
import SickButton from './styles/SickButton'
import { GetUsers, GetUsers_users } from './__generated__/GetUsers'
import { UpdatePermissions, UpdatePermissionsVariables } from './__generated__/UpdatePermissions'
import { Permission } from '../__generated__/globalTypes'

// const possiblePermissions = ['USER', 'ADMIN', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE']
const possiblePermissions = Permission

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
  if (loading || !data || !data.users) return <p>Loading...</p>
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
              {Object.entries(possiblePermissions).map((permission) => (
                <th key={String(permission)}>{permission}</th>
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
              <UserPermission user={user!} key={user?.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

function UserPermission({ user }: { user: GetUsers_users }) {
  const [permissions, setPermissions] = useState(user.permissions)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updatePermissions] = useMutation<UpdatePermissions, UpdatePermissionsVariables>(
    UPDATE_PERMISSIONS_MUTATION,
    {
      variables: { permissions, userId: user.id },
    }
  )
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

  function handlePermissionChange(e: any) {
    const checkbox = e.target
    // take a copy of the current permission
    let updatedPermissions = [...permissions!]
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
        {Object.entries(possiblePermissions).map((permission) => (
          <td key={String(permission)}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                id={`${user.id}-permission-${permission}`}
                type="checkbox"
                checked={Object.entries(permissions!).includes(permission)}
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
