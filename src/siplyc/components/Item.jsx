export const Item = ({ item }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="align-self-center">{item}</span>

      <div className="d-flex justify-content-evenly">
        <button className="btn btn-warning me-2">Editar</button>
        <button className="btn btn-danger ms-2">Borrar</button>
      </div>
    </li>
  );
}