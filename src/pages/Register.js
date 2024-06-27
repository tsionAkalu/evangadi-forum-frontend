import {useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import styles from "./Register.module.css"

function Register({setIsLogin}) {
  const navigate =  useNavigate()
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e){
   e.preventDefault();
   const usernameValue = usernameDom.current.value;
   const firstnameValue = firstnameDom.current.value;
   const lastnameValue = lastnameDom.current.value;
   const emailValue = emailDom.current.value;
   const passValue = passwordDom.current.value;
   if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passValue

   ) {
    alert('Please provide all required information');
    return;
   }
   
   try {
      await axios.post('/users/register',{
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passValue,
      });
      alert("register successfull.please login");
      setIsLogin(true)
   } catch (error) {
      alert('something were wrong!')
      console.log(error.response);
   }
   
  }


  return (
    <section className={styles.container_outer_wrapper}>
      <section className={styles.container}>
        <div className={styles.register_container}>
          <form onSubmit={handleSubmit} className={styles.register_form}>
            <br />
            <h4>Register a new account</h4>
            <p>
              {" "}
              Already have an account?
              <Link onClick={() => setIsLogin(true)} className={styles.link_color}>
                Log In
              </Link>
            </p>

            <div className={styles.form_group}>
              <input className={styles.input}
                ref={usernameDom}
                type="text"
                placeholder="Enter your username"
              />
            </div>

            <div className={styles.form_group}>
              <input className={styles.input}
                ref={firstnameDom}
                type="text"
                placeholder="Enter your first name"
              />
            </div>

            <div className={styles.form_group}>
              <input className={styles.input}
                ref={lastnameDom}
                type="text"
                placeholder="Enter your last name"
              />
            </div>

            <div className={styles.form_group}>
              <input className={styles.input}
                ref={emailDom}
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className={styles.form_group}>
              <input className={styles.input}
                ref={passwordDom}
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className={styles.btn_register}>
              Register
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}

export default Register;
