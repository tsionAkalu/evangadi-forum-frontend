import {useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e){
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (

       !emailValue ||
       !passValue
 
    ) {
     alert('Please provide all required information');
     return;
    }
    
    try {
       const { data } = await axios.post('/users/login',{
         
         email: emailValue,
         password: passValue,
       });
       alert("login successfull.");
       localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
       alert('something were wrong!')
       console.log(error.response.data);
    }
    
   }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        
        <div>
          <span>Email :---</span>
          <input  
          ref={emailDom}
          type='email' 
          placeholder='email' />
        </div>
        <br />
        <div>
          <span>Password :-----</span>
          <input 
          ref={passwordDom}
          type='password' 
          placeholder='password' />
        </div>
        <button type='submit'>login</button>
      </form>
      <Link to={'/register'}>register</Link>
    </section>
  )
}

export default Login
