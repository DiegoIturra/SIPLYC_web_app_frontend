import { Item } from "./Item";

export const List = ({ items, onDelete }) => {
  return (
    <ul className="list-group">
      {
        items.map((item, index) => (
          <Item key={index} item={item} onDelete={onDelete}/>
        ))
      }
    </ul>
  );
}
