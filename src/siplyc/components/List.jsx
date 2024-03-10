import { Item } from "./Item";

export const List = ({ items }) => {
  return (
    <ul className="list-group">
      {
        items.map((item, index) => (
          <Item key={index} item={item} />
        ))
      }
    </ul>
  );
}
