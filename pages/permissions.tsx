import PrivateRoute from '../components/PrivateRoute'
import Permissions from '../components/Permissions'

const PermissionsPage = (): JSX.Element => (
  <PrivateRoute>
    <Permissions />
  </PrivateRoute>
)

export default PermissionsPage
