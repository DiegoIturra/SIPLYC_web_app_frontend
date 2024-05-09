import { useState, useEffect } from "react";
import { useQueries } from "react-query";
import Modal from "../Modal/Modal";
import Calendar from "react-calendar";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Dropdown } from "../../../components/Dropdown";

//TODO: Fix date when display on calendar
export const EditChildren = ({ isOpen, onClose, onSave, item }) => {

  const [genders] = useState(['masculino', 'femenino']);
  const [kinderGardens, setKinderGardens] = useState([{}]);
  const [ageRanges, setAgeRanges] = useState([{}]);

  const [formData, setFormData] = useState({
    id: '',
    rut: '',
    names: '',
    father_lastname: '',
    mother_lastname: '',
    birthday: '',
    gender: '',
    group: '',
    email: '',
    state: '',
    kinder_garden_id: '',
    age_range_id: ''
  });

  useEffect(() => {
    setFormData({
      id: item.id,
      rut: item.rut,
      names: item.names,
      father_lastname: item.father_lastname,
      mother_lastname: item.mother_lastname,
      birthday: item.birthday,
      gender: item.gender,
      group: item.group,
      email: item.email,
      state: item.state,
      kinder_garden_id: item.kinder_garden_id,
      age_range_id: item.age_range_id
    });

  }, [item]);

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const fetchKindergardens = async () => await fetchData('http://localhost:3000/kinder_gardens');
  const fetchAgeRanges = async () => await fetchData('http://localhost:3000/age_ranges');

  const queries = useQueries([
    { queryKey: 'fetchKindergardens', queryFn: fetchKindergardens },
    { queryKey: 'fetchAgeRanges', queryFn: fetchAgeRanges }
  ]);

  const [kindergartensQuery, ageRangesQuery] = queries;

  //TODO: convert this function to a common function between components
  const convertDate = date => {
    const formattedDate = new Date(date)
    formattedDate.setMinutes(formattedDate.getMinutes() + formattedDate.getTimezoneOffset());
    return formattedDate;
  }

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onChangeCalendarDate = (date) => {
    setFormData({
      ...formData,
      birthday: convertDate(date)
    })
  }

  const { 
    rut, 
    names, 
    father_lastname, 
    mother_lastname, 
    birthday,
    gender,
    group,
    email,
    state,
    kinder_garden_id,
    age_range_id
  } = formData;

  useEffect(() => {
    if (kindergartensQuery.data) {
      setKinderGardens(kindergartensQuery.data);
    }
    if (ageRangesQuery.data) {
      setAgeRanges(ageRangesQuery.data);
    }

    console.log('kindergartensQuery', kindergartensQuery.data);
    console.log('ageRangesQuery', ageRangesQuery.data);

  }, [kindergartensQuery.data, ageRangesQuery.data])


  if (kindergartensQuery.isLoading || ageRangesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (kindergartensQuery.error || ageRangesQuery.error) {
    return <div>Error fetching data</div>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} onSave={() => onSave(formData)} textButton="Actualizar">
      <div className="form-group">
        <label htmlFor="rut-input">Rut</label>
        <input type="text" name="rut" onChange={onInputChange} value={rut} className="form-control" id="rut-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="names-input">Nombres</label>
        <input type="text" name="names" onChange={onInputChange} value={names} className="form-control" id="names-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="father-lastname-input">Apellido Paterno</label>
        <input type="text" name="father_lastname" onChange={onInputChange} value={father_lastname} className="form-control" id="father-lastname-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="mother-lastname-input">Apellido Materno</label>
        <input type="text" name="mother_lastname" onChange={onInputChange} value={mother_lastname} className="form-control" id="mother-lastname-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
      <label htmlFor="birthday-input">Nacimiento</label>
        <Calendar onChange={(date) => onChangeCalendarDate(date)} value={birthday} />
      </div>

      <div className="form-group">
      <label htmlFor="gender-input">Sexo</label>
        <select name="gender" onChange={onInputChange} defaultValue={gender} className="form-control" id="gender-input">
          {
            genders.map((gender) => (
              <option key={gender} value={gender}>{gender}</option>
            ))
          }
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="group-input">Grupo</label>
        <input type="text" name="group" onChange={onInputChange} value={group} className="form-control" id="group-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="email-input">Email</label>
        <input type="text" name="email" onChange={onInputChange} value={email} className="form-control" id="email-input" aria-describedby="nameHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="state-input">Estado</label>
        <input type="text" name="state" onChange={onInputChange} value={state} className="form-control" id="state-input" aria-describedby="nameHelp"/>
      </div>

      <Dropdown 
        data={kinderGardens} 
        title={'Jardín'}
        name={'kinder_garden_id'}
        onChange={onInputChange} 
        defaultValue={kinder_garden_id}
        showDefaultOption={false}
      />

      <Dropdown 
        data={ageRanges} 
        title={'Rango de edad'}
        name={'age_range_id'}
        onChange={onInputChange} 
        defaultValue={age_range_id}
        showDefaultOption={false}
      />
    </Modal>
  );
}