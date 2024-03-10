import { ListItem } from "./ListItem";

export const List = ({ properties = [], items = [], onDelete = () => {} }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {
              properties.map((property, index) => (
                <th key={index}>{property.label}</th>
              ))
            }
          </tr>
        </thead>

        <tbody>
          {
            items.map((item, index) => (
              <ListItem key={index} properties={properties} item={item} onDelete={onDelete}/>
            ))
          }
        </tbody>
      </table>
    </>

  );
}
