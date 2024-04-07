import { ListItem } from "./ListItem";

export const List = (
  { 
    properties = [], 
    items = [], 
    onDelete = () => {}, 
    handleOpenModal = () => {} 
  }) => {
  
    return (
    <>
      <table className="table table-hover" style={{ backgroundColor: 'white' }}>
        <thead className='thead-dark'>
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
              <ListItem key={index} properties={properties} item={item} onDelete={onDelete} handleOpenModal={handleOpenModal}/>
            ))
          }
        </tbody>
      </table>
    </>

  );
}
