import { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Error from './ErrorMessage'
import Table from './styles/Table'
import SickButton from './styles/SickButton'

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
]

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`

export default function Permissions() {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY)
  if (loading) return <p>Loading...</p>
  return (
    <div>
      <Error error={error} />
      <div>
        <h2>Manage Users</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map(permission => (
                <th key={permission}>{permission}</th>
              ))}
              <th>👇</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map(user => (
              <UserPermission user={user} key={user.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

function UserPermission(props) {
  console.log(props.user.permissions)
  const [permissions, setPermissions] = useState(props.user.permissions)

  function handlePermissionChange(e) {
    const checkbox = e.target
    // take a copy of the current permission
    let updatedPermissions = [...permissions]
    // figure if we need to remove or add this permission
    if (checkbox.checked) {
      // add it in!
      updatedPermissions.push(checkbox.value)
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkbox.value,
      )
    }
    setPermissions(updatedPermissions)
    console.log(updatedPermissions)
  }

  const { user } = props
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map(permission => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input
              type="checkbox"
              checked={permissions.includes(permission)}
              value={permission}
              onChange={handlePermissionChange}
            />
          </label>
        </td>
      ))}
      <td>
        <SickButton>Update</SickButton>
      </td>
    </tr>
  )
}

UserPermission.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    permission: PropTypes.array,
  }).isRequired,
}
