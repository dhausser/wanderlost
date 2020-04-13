import { useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';
import Items from '../components/Items';
import { PAGINATION_QUERY } from '../components/Pagination';

const ALL_USERS = gql`
  query AllUsers {
    users {
      id
      email
      name
      password
    }
  }
`

function Home ({ query }) {
  // const { data, loading } = useQuery(PAGINATION_QUERY)
  const { loading, error, data } = useQuery(ALL_USERS)
  if (loading) return 'Loading...';
  if (error) return error.message;
  return (
  <div>
    {JSON.stringify(data.users)}
    {/* <Items
      page={parseFloat(query.page) || 1}
      // count={data.itemsConnection.aggregate.count}
    /> */}
  </div>
)};

Home.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
};

export default Home;
