import { NavLink } from "react-router-dom"

export const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary pb-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">SIPLYC</a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className={ ({isActive}) =>  `nav-item nav-link ${ isActive ? 'active' : ''}`} to="/home">Home</NavLink>
              <NavLink className={ ({isActive}) =>  `nav-item nav-link ${ isActive ? 'active' : ''}`} to="/children">Niños</NavLink>
              <NavLink className={ ({isActive}) =>  `nav-item nav-link ${ isActive ? 'active' : ''}`} to="/teachers">Tutores</NavLink>
              <NavLink className={ ({isActive}) =>  `nav-item nav-link ${ isActive ? 'active' : ''}`} to="/kinderGardens">Jardín</NavLink>
              <NavLink className={ ({isActive}) =>  `nav-item nav-link ${ isActive ? 'active' : ''}`} to="/home">Nomina</NavLink>
            </div>
          </div>

        </div>
      </nav>
    </>
  )
}