import { useState } from "react";
import * as XLSX from 'xlsx';

const FileUploader = () => {
  const [excelData, setExcelData] = useState([]);

  const createPayload = () => {
    const payload = [];
  
    excelData.forEach((row, index) => {
      if (index > 1) {
        const [ciudad, jardin, nombres, apellido_paterno, apellido_materno, rut, grupo_edad, educadora] = row;
  
        const json = {
          ciudad,
          jardin,
          nombres,
          apellido_paterno,
          apellido_materno,
          rut,
          grupo_edad,
          educadora,
        };
  
        payload.push(json);
      }
    });

    payload.map(el => console.log(el))

    return payload;
  }

  const handleFileChange = e => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = event => {
        const data = event.target.result;
        const workbook = XLSX.read(data , { type: 'binary' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1});

        setExcelData(jsonData);
      };

      reader.readAsBinaryString(file);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange}/>
      <button onClick={createPayload}>Enviar Datos</button>

      {
        excelData.length > 0 && (
          <div>
            <h3 className="d-flex justify-content-center">Contenido del archivo excel: </h3>

            <table className="table">
              <thead>
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
                excelData.map((row, index) => (
                  (index !== 0 && index !== 1) && (
                    <tr key={index}>
                      <th scope="row">{index - 2}</th>
                      <th scope="row">{row[0]}</th>
                      <th scope="row">{row[1]}</th>
                      <th scope="row">{row[2]}</th>
                      <th scope="row">{row[3]}</th>
                      <th scope="row">{row[4]}</th>
                      <th scope="row">{row[5]}</th>
                      <th scope="row">{row[6]}</th>
                      <th scope="row">{row[7]}</th>
                    </tr>
                  )
                ))
              }
              </tbody>
            </table>

          </div>
        )
      }
    </div>
  )
}

export default FileUploader;