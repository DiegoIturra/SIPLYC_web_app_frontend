import './Sidebar.css'
import { useState } from 'react';

export const Sidebar = () => {

  const [isVisible, setIsVisible] = useState(false);

  const handleOpenSideBar = () => setIsVisible(!isVisible);

  return (
    <div className={`side-nav ${isVisible ? 'expanded' : 'collapsed'}`}>
      <ul className='navbar-nav'>

        <li className='logo' onClick={handleOpenSideBar}>
          <a href="#" className='nav-link'>
            <span className={isVisible ? 'visible' : 'hidden'}>Siplyc</span>
            <i className="fa-solid fa-bars"></i>
          </a>
        </li>

        <li className='nav-item'>
          <a href="/children" className='nav-link'>
            {isVisible ? 
              <span><i className="fa-solid fa-children"></i>Niños</span> : 
              <i className="fa-solid fa-children"></i>
            }
          </a>
        </li>

        <li className='nav-item'>
          <a href="/kinderGardens" className='nav-link'>
            {isVisible ? 
              <span><i className="fa-solid fa-school"></i>Jardines</span> : 
              <i className="fa-solid fa-school"></i>
            }
          </a>
        </li>

        <li className='nav-item'>
          <a href="/teachers" className='nav-link'>
            {isVisible ? 
              <span> <i className="fa-solid fa-user-graduate"></i>Tutores</span> : 
              <i className="fa-solid fa-user-graduate"></i>
            }
          </a>
        </li>

        <li className='nav-item'>
          <a href="/files" className='nav-link'>
            {isVisible ? 
              <span><i className="fa-solid fa-file"></i>Nomina</span> : 
              <i className="fa-solid fa-file"></i>
            }
          </a>
        </li>

        <li className='nav-item'>
          <a href="/assing_teacher_student" className='nav-link'>
            {isVisible ? 
              <span><i className="fa-solid fa-link"></i>Asignaciones</span> : 
              <i className="fa-solid fa-link"></i>
            }
          </a>
        </li>

        <li className='nav-item'>
          <a href="/login" className='nav-link'>
            {isVisible ? 
              <span><i className="fa-solid fa-right-from-bracket"></i>Logout</span> :
              <i className="fa-solid fa-right-from-bracket"></i>
            }
          </a>
        </li>

      </ul>
    </div>
  )
}