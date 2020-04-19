import { useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';
import Items from '../components/Items';
import { PAGINATION_QUERY } from '../components/Pagination';


function Home({ query }) {
  const { loading, error, data } = useQuery(PAGINATION_QUERY)
  if (loading) return 'Loading...';
  if (error) return error.message;
  return (
    <div>
      <Items
        page={parseFloat(query.page) || 1}
        count={data.items.total}
      />
    </div>
  )
};

Home.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
};

export default Home;