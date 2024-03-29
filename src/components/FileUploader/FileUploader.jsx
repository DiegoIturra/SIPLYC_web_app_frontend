import { useState } from "react";
import * as XLSX from 'xlsx';
import './FileUploader.css';
import { Table } from "../Table/Table";

export const FileUploader = () => {
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
    <div className="main-container">

      <div className="uploader-container">

        <label htmlFor="input-file" className="label-file-container">
          <div className="image-file-container">
            <img src="/img/upload-file.svg" alt="" />
          </div>
          
          <p>Select file</p>

          <input id="input-file" type="file" onChange={handleFileChange} hidden/>
        </label>
      </div>

      {
        excelData.length > 0 && (
          <>
            <Table data={excelData}/>
            <button className="upload-file-button" onClick={createPayload}> Upload </button>
          </>
        )
      }
    </div>
  )
}