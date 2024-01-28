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
      <button onClick={createPayload}>show data</button>

      {
        excelData.length > 0 && (
          <div>
            <h3>Contenido del archivo excel: </h3>
            <ul>
              {
                excelData.map((row, index) => (
                  <li key={index}>{JSON.stringify(row)}</li>
                ))
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader;