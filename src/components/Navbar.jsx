import { NavLink, Link, useNavigate } from "react-router-dom"

export const NavBar = () => {

  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/login', {
      replace: true
    })
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
        <Link className="navbar-brand" to="/home">SIPLYC</Link>

        <div className="container-fluid">
          <div className="navbar-nav">
            <NavLink className={ ({isActive}) =>  `nav-item nav-link ${ isActive ? 'active' : ''}`} to="/children">Niños</NavLink>
            <NavLink className={ ({isActive}) =>  `nav-item nav-link ${ isActive ? 'active' : ''}`} to="/kinderGardens">Jardines</NavLink>
            <NavLink className={ ({isActive}) =>  `nav-item nav-link ${ isActive ? 'active' : ''}`} to="/teachers">Tutores</NavLink>
          </div>
        </div>

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
          <ul className="navbar-nav ml-auto">
            <span className='nav-item nav-link text-primary'>currentUser</span>
            <button className='nav-item nav-link btn' onClick={onLogout}>Logout</button>
          </ul>
        </div>
      </nav>
    </>
  )
}