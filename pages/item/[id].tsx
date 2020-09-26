import { GetServerSideProps } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { initializeApollo } from '../../apollo/client'
import SingleItem, { SINGLE_ITEM_QUERY } from '../../components/SingleItem'
import { GetItem } from '../../components/__generated__/GetItem'

function Item({ item }: GetItem): JSX.Element {
  return <SingleItem item={item} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient: ApolloClient<NormalizedCacheObject | null> = initializeApollo()

  const { data } = await apolloClient.query({
    query: SINGLE_ITEM_QUERY,
    variables: {
      id: context.params?.id,
    },
  })

  return {
    props: {
      item: data.item,
    },
  }
}

export default Item
