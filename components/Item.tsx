import Link from 'next/link'
import Title from './styles/Title'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import formatMoney from '../lib/formatMoney'
import DeleteItem from './DeleteItem'
import AddToCart from './AddToCart'
import { GetItem } from './__generated__/GetItem'

export default function Item({ item }: GetItem): JSX.Element {
  if (!item) throw new Error('Item not found')
  return (
    <ItemStyles>
      {item.image && <img src={item.image} alt={item.title} />}
      <Title>
        <Link href="/item/[id]" as={`/item/${item.id}`}>
          <a>{item.title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(item.price)}</PriceTag>
      <p>{item.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: { id: item.id },
          }}
        >
          <a>Edit ✏️</a>
        </Link>
        <AddToCart id={item.id} />
        <DeleteItem id={item.id}>Delete this Item</DeleteItem>
      </div>
    </ItemStyles>
  )
}
