import './Table.css'

export const Table = ({ data }) => {
  return(
    <div className="data-table-container">
      <h3 className="d-flex justify-content-center">Contenido del archivo excel: </h3>
      
      <table className="table table-hover" style={{ backgroundColor: 'white' }}>
        <thead className='thead-dark'>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Jardín</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellido Paterno</th>
            <th scope="col">Apellido Materno</th>
            <th scope="col">Rut</th>
            <th scope="col">Grupo Edad</th>
            <th scope="col">Educadora</th>
          </tr>
        </thead>

        <tbody>
        {
          data.map((row, index) => (
            (index !== 0 && index !== 1) && (
              <tr key={index}>
                
                <th scope="row">{index - 2}</th>
                
                {[...Array(8)].map((_, columnIndex) => (
                  <th key={columnIndex} scope="row">{row[columnIndex]}</th>
                ))}
              </tr>
            )
          ))
        }
        </tbody>
      </table>
  </div>
  )
}