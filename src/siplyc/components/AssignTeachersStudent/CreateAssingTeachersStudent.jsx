import { useEffect, useState } from "react"
import { useQueries } from "react-query"
import { Dropdown } from "../../../components/Dropdown"
import Modal from "../Modal/Modal"

export const CreateAssingTeachersStudent = ({ onClose, onSave }) => {

  const [formData, setFormData] = useState({
    teacher_id: '',
    student_id: ''
  });

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const { student_id, teacher_id } = formData;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [ name ]: value
    })
  }

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
    <Modal onClose={onClose} onSave={() => onSave(formData)}>
      <Dropdown
        data={teachers}
        title="Profesor"
        name={'teacher_id'}
        value={teacher_id}
        keyName="names"
        onChange={onInputChange}
        showDefaultOption={true}
      />

      <Dropdown
        data={students}
        title="Niño"
        name={'student_id'}
        value={student_id}
        keyName="names"
        onChange={onInputChange}
        showDefaultOption={true}
      />
    </Modal>
  )
}