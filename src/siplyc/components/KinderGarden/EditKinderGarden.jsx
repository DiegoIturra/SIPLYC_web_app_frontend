import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Modal from "../Modal/Modal";
import { Dropdown } from "../../../components/Dropdown";

export const EditKinderGarden = ({ isOpen, onClose, onSave, item }) => {

  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    city_id: ''
  });

  useEffect(() => {
    setFormData({
      id: item.id,
      name: item.name,
      address: item.address,
      phone: item.phone,
      city: item.city_name
    });
  }, [item]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const { name, address, phone, city_id } = formData;

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
    <Modal isOpen={isOpen} onClose={onClose} onSave={() => onSave(formData)} textButton="Actualizar">
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
      
      <Dropdown 
        data={cities}
        title={'Ciudad'}
        name={'city_id'}
        value={city_id}
        onChange={onInputChange}
        showDefaultOption={false}
      />

    </Modal>
  );
}