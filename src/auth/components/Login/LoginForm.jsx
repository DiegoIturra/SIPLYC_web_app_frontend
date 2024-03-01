import { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import './styles.css'

const LoginForm = () => {

  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  })

  const [ credentials, setCredentials ] = useState({
    email: '',
    password: ''
  })

  const onFormSubmit = (event) => {
    event.preventDefault()

    console.log(credentials); //Delete unnecesary log

    setCredentials({
      email,
      password
    })
  }

  return (
    <div className='main-container'>
      
      <div className='login-container'>

        {/* div for image */}
        <div className='image-div'>
          <img src='/img/login-image.png' alt='image for login'/>
        </div>

        {/* div for login form */}
        <div className='login-div'>
          
          <h4>Sign In</h4>

          <form onChange={onFormSubmit} className='form'>

            <input 
              type="text" 
              placeholder="Email" 
              name='email'
              value={email}
              className="form-control"
              onChange={onInputChange}
            />

            <input 
              type="password" 
              placeholder="Password"
              name='password' 
              value={password}
              className="form-control"
              onChange={onInputChange}
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