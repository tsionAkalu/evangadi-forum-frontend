import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/HomePage/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import QuestionDetalAndAnswer from "./Components/QuestionDetalAndAnswer/QuestionDetalAndAnswer";
import { useEffect, useState, createContext } from "react";
import axios from "./axiosConfig";
import LandingLogingPage from "./Components/LandingLoginPage/LandingLoginPage"
import SignUpPage from "./Components/signUpPage/signUpPage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

export const AppState = createContext() 
function App() {

  const [user, setuser] = useState({});
  // const [user, setuser] = useState(null);

  const token = localStorage.getItem ('token');
  const navigate = useNavigate();
  async function checkUser(){
    try {
      const { data } = await axios.get('/users/check', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setuser(data);
      console.log(data);
    } catch (error) {
      console.log(error.response);
      // navigate('/login');
      navigate('/auth');
    }
  }

  useEffect(() =>{
    checkUser();
  }, [navigate]);

  return (
    <AppState.Provider value={{user, setuser}}>
     <Header />
  
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/login" element={<Login/>} /> */}
        {/* <Route path="/login" element={<LandingLogingPage/>} />
        <Route path="/register" element={<Register/>} /> */}
        <Route path="/askquestions" element={<AskQuestion/>} />
        <Route path="/questions/:questionid" element={<QuestionDetalAndAnswer/>} />
        <Route path="/auth" element={<SignUpPage/>} />

        
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
