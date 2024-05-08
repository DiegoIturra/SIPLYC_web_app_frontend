import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import { useQuery } from "react-query";

//TODO: Update page when a new item is created
export const CreateKinderGarden = ({ isOpen, onClose, onSave }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    city_id: ''
  });

  const [cities, setCities] = useState([]);
  const { name, address, phone, city_id } = formData;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [ name ]: value
    })
  }

  const fetchItems = async () => {
    // TODO: Replace raw string with enviroment variable
    const response = await fetch('http://127.0.0.1:3000/cities')
    const data = await response.json()
    return data
  }

  const { isLoading, error, data } = useQuery('fetchCities', fetchItems);

  useEffect(() => {
    if (data) {
      setCities(data);
    }
  }, [data]);

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  return (
    <Modal isOpen={isOpen} onClose={onClose} onSave={() => onSave(formData)}>
      <div className="form-group">
        <label htmlFor="name-input">Nombre</label>
        <input type="text" name="name" onChange={onInputChange} value={name} className="form-control" id="name-input" aria-describedby="nameHelp"/>
      </div>
      
      <div className="form-group">
        <label htmlFor="address-input">Dirección</label>
        <input type="text" name="address" onChange={onInputChange} value={address} className="form-control" id="address-input"/>
      </div>

      <div className="form-group">
        <label htmlFor="phone-input">Teléfono</label>
        <input type="text" name="phone" onChange={onInputChange} value={phone} className="form-control" id="phone-input"/>
      </div>

      <div className="form-group">
        <label htmlFor="city-input">Ciudad</label>
        <select name="city_id" onChange={onInputChange} value={city_id} className="form-control" id="city-input">
          <option value="">Seleccione una ciudad</option>
          {
            cities.map((city) => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))
          }
        </select>
      </div>
    </Modal>
  );
}