export const Dropdown = ({data, title, name, value, onChange, showDefaultOption}) => {  
  return (
    <div className="form-group">
      <label htmlFor="dropdown-input">{title}</label>
      <select name={name} onChange={onChange} value={value} className="form-control" id="dropdown-input">
        {showDefaultOption && <option value="">Selecciona un {title}</option>}
        {
          data.map((element) => (
            <option key={element.id} value={element.id}>{element.name}</option>
          ))
        }
      </select>
    </div>
  );
}