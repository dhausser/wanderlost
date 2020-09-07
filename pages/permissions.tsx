import PrivateRoute from '../components/PrivateRoute'
import Permissions from '../components/Permissions'

const PermissionsPage = () => (
  <PrivateRoute>
    <Permissions />
  </PrivateRoute>
)

export default PermissionsPage
