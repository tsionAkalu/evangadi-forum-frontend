import React, { useRef } from 'react'
import axios from '../../axiosConfig';
import classes from "./AskQuestion.module.css"
import { useNavigate } from 'react-router-dom';

function AskQuestion() {
    const titleName = useRef();
    const descriptionName = useRef();
    const token = localStorage.getItem ('token');
    const navigate = useNavigate()

  async function sendQuestion(e) {
    e.preventDefault();
    const titleValue = titleName.current.value;
    const descriptionValue = descriptionName.current.value;

    if (!titleValue || !descriptionValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      
      const config = {
        headers: {
            Authorization: 'Bearer '+ token,
          },
      };

      // Send the request with the authorization header
      await axios.post(
        "/questions/post-question",
        {
          title: titleValue,
          description: descriptionValue,
        },
        config
      );

      alert("Your question has been posted");
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={classes.ask_container}>
<div className={classes.steps_container}>
    
        <h3 className={classes.steps_heading}>
          Steps to write a good question
        </h3>
        <ul className={classes.steps_list}>
          <li>Summarize your question</li>
          <li>Describe your question</li>
          <li>Review your question</li>
        </ul>
      </div>
      <h2 className={classes.form_heading}>Ask a public Question</h2>
        <div onClick={() =>navigate("/")} className={classes.goto_question}>Go to Question page</div>
      <form onSubmit={sendQuestion} className={classes.form}>
        <input
          ref={titleName}
          type="text"
          // size="115"
          placeholder="Enter title"
          // className={classes.input_field}
        />

        <textarea
          ref={descriptionName}
          
        
          placeholder="Enter description"
          // className={classes.textarea}
        ></textarea>

        <div>
          <button type="submit" className={classes.submit_button}>
          Post Question
        </button>
        </div>
      </form>
    </div>
  )
}

export default AskQuestion;
