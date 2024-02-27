import './styles.css'

const LoginForm = () => {
  return (
    <div className='main-container'>
      
      <div className='login-container'>

        {/* div for image */}
        <div className='image-div'>
          <img src='/public/img/login-image.png' alt='image for login'/>
        </div>

        {/* div for login form */}
        <div className='login-div'>
          
          <h4>Sign In</h4>

          <form action="" className='form'>

            <input 
              type="text" 
              placeholder="Email" 
              name='Email'
              className="form-control"
            />

            <input 
              type="password" 
              placeholder="Password"
              name='Password' 
              className="form-control"
            />

            <button 
              type="submit" 
              className="login-button"
            >
            Log in
            </button>

          </form>
        </div>


      </div>

    </div>
  )
}

export default LoginForm;