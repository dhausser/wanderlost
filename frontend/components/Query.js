import React from 'react';
import { useQuery } from '@apollo/react-hooks';

export default ({ children, ...props }) => {
  const { data, loading, error } = useQuery(...props);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return children(data);
};
