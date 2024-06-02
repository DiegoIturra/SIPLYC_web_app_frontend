import { useState, useEffect } from "react";
import { useQueries } from "react-query";
import Modal from "../Modal/Modal";
import { Dropdown } from "../../../components/Dropdown";

export const EditAssingTeachersStudent = ({ isOpen, onClose, onSave, item }) => {
  const [formData, setFormData] = useState({
    id: '',
    teacher_id: '',
    student_id: ''
  });

  const [teachers, setTeachers] = useState([{}]);
  const [students, setStudents] = useState([{}]);

  useEffect(() => {
    setFormData({
      id: item.id,
      teacher_id: item.teacher_id,
      student_id: item.student_id
    });

    console.log('Item:', item);
  }, [item]);

  const { teacher_id, student_id } = formData;
  
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const fetchTeachers = async () => await fetchData('http://localhost:3000/teachers');
  const fetchStudents = async () => await fetchData('http://localhost:3000/students');

  const queries = useQueries([
    { queryKey: 'fetchTeachers', queryFn: fetchTeachers },
    { queryKey: 'fetchStudent', queryFn: fetchStudents }
  ]);

  const [teachersQuery, studentsQuery] = queries;

  useEffect(() => {
    if (teachersQuery.data) {
      setTeachers(teachersQuery.data);
    }
    if (studentsQuery.data) {
      setStudents(studentsQuery.data);
    }
  }, [teachersQuery.data, studentsQuery.data])


  if (teachersQuery.isLoading || studentsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (teachersQuery.error || studentsQuery.error) {
    return <div>Error fetching data</div>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} onSave={() => onSave(formData)} textButton="Actualizar">
      <Dropdown
        data={teachers}
        title="Profesor"
        name={'teacher_id'}
        value={teacher_id}
        keyName="names"
        onChange={onInputChange}
      />

      <Dropdown
        data={students}
        title="Niño"
        name={'student_id'}
        value={student_id}
        keyName="names"
        onChange={onInputChange}
      />
      
    </Modal>
  );
}