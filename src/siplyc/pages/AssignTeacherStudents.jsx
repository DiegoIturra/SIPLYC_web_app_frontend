import { List } from "../components/List";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Paginate } from "../components/Paginate";
import { useLocation, useNavigate } from "react-router-dom";

export const AssignTeacherStudents = () => {

  const properties = [
    { label: 'Nombre Tutor', key: "teacher.names" },
    { label: 'Nombre Alumno', key: 'student.names' },
    { label: 'Apellido Paterno', key: 'student.father_lastname' },
    { label: 'Apellido Materno', key: 'student.mother_lastname' },
    { label: 'Acciones', key: 'actions' },
  ]

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const page = parseInt(searchParams.get('page')) || 1;
  const [items, setItems] = useState([]);

  // Redirigir a la página 1 si el parámetro 'page' no está presente en la URL
  useEffect(() => {
    if (!searchParams.has('page')) {
      searchParams.set('page', '1');
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
  }, [location, navigate, searchParams]);

  // TODO: Replace raw string with enviroment variable
  const fetchItems = async ({ queryKey }) => {
    // eslint-disable-next-line no-unused-vars
    const [_key, { page }] = queryKey;
    const response = await fetch(`http://localhost:3000/teacher_students/paginated?page=${page}&per_page=10`);
    const data = await response.json();
    setTotalPages(data.total_pages);
    setCurrentPage(data.current_page);
    setHasNext(data.has_next);
    setHasPrev(data.has_prev);
    return data.assignments;
  };

  const { isLoading, error, data } = useQuery(['fetch_assignments', { page }], fetchItems);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div style={{ backgroundColor: '#00ac96', minHeight: '100vh' }}>
      {/* <FlashNotification message={flashMessage} isVisible={openFlash} type={notificationType} onClose={handleCloseFlash}/> */}
      <h1 className="container pt-4 d-flex justify-content-center align-items-center">Asignaciones Tutor - Niño</h1>

      <div className="container pt-4 d-flex justify-content-center align-items-center">
        {/* <button className="btn btn-primary" onClick={handleOpenCreateModal}>Nuevo +</button> */}
      </div>

      <div className="container mt-4 pb-4 d-flex justify-content-center align-items-center">
        <div className="col-7">
          <List 
            properties={properties} 
            items={items} 
            // onDelete={handleDelete} 
            // onClick={handleClickItem}
            // handleOpenModal={handleOpenEditModal}
          />
        </div>
      </div>

      <div>

      <div className="container d-flex justify-content-center align-items-center">
        <Paginate 
          currentPage={currentPage} 
          totalPages={totalPages} 
          hasNext={hasNext} 
          hasPrev={hasPrev} 
        />
      </div>

      </div>

      {/* { createModalOpen && <CreateChildren onClose={handleCloseCreateModal} onSave={handleCreate}/>}
      { editModalOpen && <EditChildren onClose={handleCloseEditModal} onSave={handleUpdate} item={item}/>} */}
      
    </div>
  )
}