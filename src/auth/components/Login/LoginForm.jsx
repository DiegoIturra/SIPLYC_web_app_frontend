import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context';
import { useForm } from '../../../hooks/useForm';
import './LoginForm.css'

const LoginForm = () => {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  })

  const onFormSubmit = async (event) => {
    event.preventDefault()

    //TODO: implement this later
    //const lastPath = localStorage.getItem('lastPath');

    // TODO: Implement login with credentials in the backend
    const canLogin = await login(email, password)

    if(!canLogin) return;

    navigate('/files', {
      replace: true
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

          <form onSubmit={onFormSubmit} className='form'>

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