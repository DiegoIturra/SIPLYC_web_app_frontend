import './styles.css'

export const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-container" >
      <img src="/img/unauthorized.jpg" alt="unauthorized image"/>
      <h4>Regresar al <a href="/login">Login</a></h4>
    </div>
  )
}