import { List } from "../components/List";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Paginate } from "../components/Paginate";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateChildren } from "../components/Children/CreateChildren";
import { EditChildren } from "../components/Children/EditChildren";
import { FlashNotification } from "../components/FlashNotification";

export const ChildrenPage = () => {

  // Paginated Records
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const page = parseInt(searchParams.get('page')) || 1;

  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openFlash, setOpenFlash] = useState(false);
  const [notificationType, setNotificationType] = useState('success');
  const [flashMessage, setFlashMessage] = useState('');

  // Redirect to first page if no page query param is present
  useEffect(() => {
    if (!searchParams.has('page')) {
      searchParams.set('page', '1');
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
  }, [location, navigate, searchParams]);

  const updateItem = async (item) => {
    const id = item.id;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }

    // TODO: Replace raw string with enviroment variable
    const response = await fetch(`http://127.0.0.1:3000/students/${id}`, options);

    if(response.ok) {
      const data = await response.json();
      setItems(prevItems => prevItems.map(item => item.id === data.id ? data : item));
      showFlashNotification('success', 'Registro actualizado correctamente')
      return data;
    } else {
      showFlashNotification('danger', 'Error al actualizar el registro')
      throw new Error('Error al actualizar el registro');
    }
  }

  const createItem = async (item) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }

    // TODO: Replace raw string with enviroment variable
    const response = await fetch('http://127.0.0.1:3000/students', options);

    if(response.ok) {
      const data = await response.json();
      setItems([...items, data]);
      showFlashNotification('success', 'Registro creado correctamente')
      return data;
    } else {
      showFlashNotification('danger', 'Error al crear el registro')
      throw new Error('Error al crear registro');
    }  
  }

  const deleteItem = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // TODO: Replace raw string with enviroment variable
    const response = await fetch(`http://127.0.0.1:3000/students/${id}`, options);

    if(response.ok) {
      setItems(prevItems => prevItems.filter(item => item.id !== id))
      showFlashNotification('success', 'Registro eliminado correctamente')
      return response;
    } else {
      showFlashNotification('danger', 'Error al eliminar el registro')
      throw new Error('Error al eliminar registro');
    } 
    
  }

  const properties = [
    { label: 'Rut', key: 'rut' },
    { label: 'Nombres', key: 'names' },
    { label: 'Apellido Paterno', key: 'father_lastname' },
    { label: 'Apellido Materno', key: 'mother_lastname' },
    { label: 'Nacimiento', key: 'birthday' },
    { label: 'Sexo', key: 'gender' },
    { label: 'Grupo', key: 'group' },
    { label: 'Email', key: 'email' },
    { label: 'Estado', key: 'state' },
    { label: 'Acciones', key: 'actions' },
  ]

  const handleOpenEditModal = (item) => {
    setEditModalOpen(true);
    setItem(item)
  };

  const handleOpenCreateModal = () => setCreateModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseCreateModal = () => setCreateModalOpen(false);
  const handleCloseFlash = () => setOpenFlash(false);

  const handleClickItem = (item) => console.log('Click', item);
  const handleCreate = async (item) => await createItem(item);
  const handleUpdate = async (item) => await updateItem(item);
  const handleDelete = async (id) => await deleteItem(id);

  const showFlashNotification = (type = 'success', message = '') => {
    setOpenFlash(true);
    setNotificationType(type);
    setFlashMessage(message);
  }

    // TODO: Replace raw string with enviroment variable
    const fetchItems = async ({ queryKey }) => {
      // eslint-disable-next-line no-unused-vars
      const [_key, { page }] = queryKey;
      const response = await fetch(`http://localhost:3000/students/paginated?page=${page}&per_page=10`);
      const data = await response.json();
      setTotalPages(data.total_pages);
      setCurrentPage(data.current_page);
      setHasNext(data.has_next);
      setHasPrev(data.has_prev);
      return data.students;
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
      <FlashNotification message={flashMessage} isVisible={openFlash} type={notificationType} onClose={handleCloseFlash}/>
      <h1 className="container pt-4 d-flex justify-content-center align-items-center">Niños</h1>

      <div className="container pt-4 d-flex justify-content-center align-items-center">
        <button className="btn btn-primary" onClick={handleOpenCreateModal}>Nuevo +</button>
      </div>

      <div className="container mt-4 pb-4 d-flex justify-content-center align-items-center">
        <div className="col-7">
          <List 
            properties={properties} 
            items={items} 
            onDelete={handleDelete} 
            onClick={handleClickItem}
            handleOpenModal={handleOpenEditModal}
          />
        </div>
      </div>

      <div className="container d-flex justify-content-center align-items-center">
        <Paginate 
          currentPage={currentPage} 
          totalPages={totalPages} 
          hasNext={hasNext} 
          hasPrev={hasPrev} 
        />
      </div>

      { createModalOpen && <CreateChildren onClose={handleCloseCreateModal} onSave={handleCreate}/>}
      { editModalOpen && <EditChildren onClose={handleCloseEditModal} onSave={handleUpdate} item={item}/>}
      
    </div>
  )
}