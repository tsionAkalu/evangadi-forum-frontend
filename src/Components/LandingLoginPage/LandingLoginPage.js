import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./LandingLoginPage.module.css";

function Login({setIsLogin}) {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("login successful. please login");
      console.log(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");

      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }

  return (
    <section className={classes.container_outer_wrapper}>
      <section className={classes.container}>
        <div className={classes.login_container}>
          <form onSubmit={handleSubmit} className={classes.login_form}>
            <br />
            <h4>Login to your account</h4>
            <p>
              {" "}
              Don't have account
              <Link onClick={() => setIsLogin(false)}
              className={classes.link_color}> Create a new account</Link>
            </p>

            <div className="form-group">
              <input
                ref={emailDom}
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <div className={classes.form_group}>
              <input
                ref={passwordDom}
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className={classes.btn_login}>
              Submit
            </button>
          </form>
          
        </div>

        
      </section>
    </section>
  );
}

export default Login;