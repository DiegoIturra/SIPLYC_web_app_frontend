import { List } from "../components/List"
import { useQuery } from "react-query";
import { useState, useMemo, useEffect } from "react";
import { EditKinderGarden } from "../components/KinderGarden/EditKinderGarden";
import { CreateKinderGarden } from "../components/KinderGarden/CreateKinderGarden";
import { FlashNotification } from "../components/FlashNotification";
import { Paginate } from "../components/Paginate";
import { useLocation, useNavigate } from "react-router-dom";

export const KinderGardensPage = () => {

  const properties = [
    { label: 'Nombre', key: 'name' },
    { label: 'Dirección', key: 'address' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'Ciudad', key: 'city_name' },
    { label: 'Acciones', key: 'actions' }
  ]

  // Paginated Records
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const page = parseInt(searchParams.get('page')) || 1;


  // Redirect to first page if no page query param is present
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
    const response = await fetch(`http://localhost:3000/kinder_gardens/paginated?page=${page}&per_page=10`);
    const data = await response.json();
    setTotalPages(data.total_pages);
    setCurrentPage(data.current_page);
    setHasNext(data.has_next);
    setHasPrev(data.has_prev);
    return data.kinder_gardens;
  };

  const { isLoading, error, data } = useQuery(['fetch_kinder_gardens', { page }], fetchItems);

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
    const response = await fetch(`http://127.0.0.1:3000/kinder_gardens/${id}`, options);

    if(response.ok) {
      const data = await response.json();
      
      const newItem = {
        ...data,
        city_name: data.city.name
      }

      setItems(prevItems => prevItems.map(item => item.id === newItem.id ? newItem : item));
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
    const response = await fetch('http://127.0.0.1:3000/kinder_gardens', options);

    if(response.ok) {
      const data = await response.json();

      const newItem = {
        ...data,
        city_name: data.city.name
      }

      setItems([...items, newItem]);
      showFlashNotification('success', 'Registro creado correctamente')
      return data
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
    const response = await fetch(`http://127.0.0.1:3000/kinder_gardens/${id}`, options);

    if(response.ok) {
      setItems(prevItems => prevItems.filter(item => item.id !== id))
      showFlashNotification('success', 'Registro eliminado correctamente')
      return response;
    } else {
      showFlashNotification('danger', 'Error al eliminar el registro')
      throw new Error('Error al eliminar registro');
    } 

  }

  const [items, setItems] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [item, setItem] = useState('');
  const [openFlash, setOpenFlash] = useState(false);
  const [notificationType, setNotificationType] = useState('success');
  const [flashMessage, setFlashMessage] = useState('');

  const handleOpenEditModal = (item) => {
    setEditModalOpen(true);
    setItem(item)
  };

  const handleOpenCreateModal = () => setCreateModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseCreateModal = () => setCreateModalOpen(false);
  const handleCloseFlash = () => setOpenFlash(false);

  const showFlashNotification = (type = 'success', message = '') => {
    setOpenFlash(true);
    setNotificationType(type);
    setFlashMessage(message);
  }


  const handleUpdate = async (formData) => await updateItem(formData);
  const handleCreate = async (formData) => await createItem(formData);
  const handleDelete = async (id) => await deleteItem(id);

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

      <h1 className="container pt-4 d-flex justify-content-center align-items-center">Jardines</h1>

      <div className="container pt-4 d-flex justify-content-center align-items-center">
        <button className="btn btn-primary" onClick={handleOpenCreateModal}>Nuevo +</button>
      </div>

      <div className="container mt-4 pb-4 d-flex justify-content-center align-items-center">
        <div className="col-7">
          <List properties={properties} items={items} onDelete={handleDelete} handleOpenModal={handleOpenEditModal}/>
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

      { editModalOpen && <EditKinderGarden onClose={handleCloseEditModal} onSave={handleUpdate} item={item}/>}
      { createModalOpen && <CreateKinderGarden onClose={handleCloseCreateModal} onSave={handleCreate}/>}
    </div>
  )
}