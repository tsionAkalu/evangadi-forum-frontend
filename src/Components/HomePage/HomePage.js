import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import { FaRegUser, FaChevronRight } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  const [values, setValues] = useState([]);

  useEffect(() => {
    async function allquestion(){
      await axios
      .get("/questions/all-questions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setValues(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    allquestion()
  }, []);
  console.log("values", values);


  // console.log(user.username);

  function Detail(questionid) {
    navigate(`/questions/${questionid}`);
  }

  function AskQ() {
    navigate("/askquestions");
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcome_section}>
        <div>
          <button onClick={AskQ} className={styles.ask_question_button}>Ask Question</button>
          <h4>Questions</h4>
        </div>
        <h2>Welcome: {user?.username}</h2>
      </div>
      <div className={styles.questions_section}>
        {values.map((value, i) => (
          <div key={i} className={styles.question_container} onClick={() => Detail(value.questionid)}>
            <div className={styles.user_area}>
              <div><FaRegUser className={styles.user_icon} /></div>
              <div><p>{value?.username}</p></div>
            </div>
            <div className={styles.title}>
              <h4>{value?.title}</h4>
            </div>
            <div className={styles.arrow}>
              <FaChevronRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

  // {/* <button onClick={() => Detail(value.questionid)}>Click</button> */}

export default Home;