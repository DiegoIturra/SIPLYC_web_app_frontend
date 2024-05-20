import { useState } from "react";
import * as XLSX from 'xlsx';
import './FileUploader.css';
import { Table } from "../Table/Table";
import { PacmanLoader} from "react-spinners";

export const FileUploader = ({ onSuccess, onError }) => {
  const [excelData, setExcelData] = useState([]);
  const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);

  const createPayload = () => {
    const payload = [];
  
    excelData.forEach((row, index) => {
      if (index > 1) {
        const [ciudad, jardin, nombres, apellido_paterno, apellido_materno, rut, grupo_edad, educadora] = row;
  
        const json = {
          city: ciudad,
          kinder_garden: jardin,
          names: nombres,
          father_lastname: apellido_paterno,
          mother_lastname: apellido_materno,
          rut: rut,
          age_range: grupo_edad,
          teacher: educadora,
        };
  
        payload.push(json);
      }
    });

    payload.map(el => console.log(el))

    return payload;
  }

  const sendData = async () => {
    const payload = {
      data: createPayload()
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    //TODO: replace raw string with enviroment variable
    try {
      setIsSpinnerLoading(true);
      const response = await fetch('http://localhost:3000/process_files/process_excel_file', options);

      if(response.ok) {
        await response.json();
        onSuccess();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      onError();
    } finally {
      setIsSpinnerLoading(false);
    }

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
      {isSpinnerLoading && (
        <div className="spinner-overlay">
          <PacmanLoader size={90} color={"#36d7b7"} loading={isSpinnerLoading} />
        </div>
      )}

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
            <button className="upload-file-button" onClick={sendData}> Upload </button>
          </>
        )
      }
    </div>
  )
}