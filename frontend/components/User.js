import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

const User = () => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
}

User.PropTypes = {
  children: PropTypes.func.isRequired 
};

export default CURRENT_USER_QUERY;
