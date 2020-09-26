import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import Items, { ALL_ITEMS_QUERY } from '../components/Items'

function IndexPage(): JSX.Element {
  const router = useRouter()
  const { page } = router.query

  return <Items page={parseFloat(page as string) || 1} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient: ApolloClient<NormalizedCacheObject | null> = initializeApollo()

  await apolloClient.query({
    query: ALL_ITEMS_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default IndexPage
