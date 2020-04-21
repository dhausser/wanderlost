import Item from './Item';
import Pagination from './Pagination';
import { Center, ItemsList } from './Items'

export default function Items({ items, page }) {
  return (
    <Center>
      <ItemsList>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ItemsList>
      <Pagination page={page} />
    </Center>
  );
}
