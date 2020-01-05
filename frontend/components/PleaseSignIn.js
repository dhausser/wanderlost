import { useUser } from './User';
import Signin from './Signin';

function PleaseSignIn({ children }) {
  const me = useUser();
  if (!me) {
    return (
      <div>
        <p>Please Sign In before continuing</p>
        <Signin />
      </div>
    );
  }
  return children;
}

export default PleaseSignIn;
