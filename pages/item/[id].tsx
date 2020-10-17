import { GetServerSideProps } from 'next'
import SingleItem from '../../components/SingleItem'
import { GetItemVariables } from '../../components/__generated__/GetItem'

function Item({ id }: GetItemVariables): JSX.Element {
  return <SingleItem id={id} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.params?.id,
    },
  }
}

export default Item
