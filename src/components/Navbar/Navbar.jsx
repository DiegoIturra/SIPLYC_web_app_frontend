import { useContext } from 'react'
import { AuthContext } from '../../auth/context'
import './Navbar.css'

export const NavBar = () => {

  const { user } = useContext(AuthContext)
  
  return (
    <>
      <nav className="nav">

        <div className="title-container">
          <h1 className="title">SIPLYC</h1>
        </div>

        <div className="right-container">

          <p>{user?.names}</p>
          <i className="fa-solid fa-bell"></i>

          <div className="user-image-container">
            <img src="/img/user.png" alt="user-image" />
          </div>
        </div>
        
      </nav>
    </>
  )
}