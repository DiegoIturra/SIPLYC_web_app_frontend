import './Navbar.css'

export const NavBar = () => {

  return (
    <>
      <nav className="nav">

        <div className="title-container">
          <h1 className="title">SIPLYC</h1>
        </div>

        <div className="right-container">
          <i className="fa-solid fa-bell"></i>

          <div className="user-image-container">
            <img src="/img/user.png" alt="user-image" />
          </div>
        </div>
        
      </nav>
    </>
  )
}