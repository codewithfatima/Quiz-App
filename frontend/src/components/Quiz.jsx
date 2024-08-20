import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { data } from './data'; 
import ResultTable from './ResultTable';

const baseurl = "https://quiz-app-3-3bf6.onrender.com"

const userName = localStorage.getItem('userName');

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track the number of correct answers

  useEffect(() => {
    // Update question whenever index changes
    setQuestion(data[index]);
    setLock(false); // Reset lock when changing question
    setSelectedOption(null); // Reset selected option
  }, [index]);

  const CheckAnswer = (e, answer) => {
    if (!lock) {
      const listItem = e.target;

      if (question.answer === answer) {
        listItem.classList.add("correct");
        setCorrectAnswers(prev => prev + 1); // Increment correct answers count
      } else {
        listItem.classList.add("wrong");
      }
      setLock(true);
      setSelectedOption(answer); // Save the selected option
    }
  };

  const handleNext = () => {
    if (index === data.length - 1) {
      setQuizEnded(true); // End the quiz when reaching the last question
    } else {
      setIndex((prevIndex) => (prevIndex + 1) % data.length); // Move to next question
    }
  };
  
  if (quizEnded) {
    // Calculate total score based on correct answers
    const totalScore = 25; 
    const score = correctAnswers * 5; // Each correct answer is worth 5 points
///quiz-app-2-77eh.onrender.com
    // Send the result to the backend
    fetch('https://localhost:5000/saveResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        score: score,
        totalScore: totalScore,
        remarks: score === 20 
            ? 'Excellent' 
            : score < 15 
            ? 'Need Improvement' 
            : 'Good effort'
    }),
    
    })
    .then(response => response.json())
    .then(data => console.log('Result saved:', data))
    .catch(error => console.error('Error saving result:', error))

    
    return <ResultTable />;
  }


  return (
    <>
      <div className="container">
        <div className="quiz-header">
          <h2 className="heading">Quiz</h2>
          <small className="question-total">{index + 1} of {data.length} Questions</small>
          <br />
          <hr />
        </div>
        <h3>{index + 1}. {question.question}</h3>
        <ul>
          <li
            className={selectedOption === 1 ? (question.answer === 1 ? 'correct' : 'wrong') : ''}
            onClick={(e) => CheckAnswer(e, 1)}
          >
            {question.option1}
          </li>
          <li
            className={selectedOption === 2 ? (question.answer === 2 ? 'correct' : 'wrong') : ''}
            onClick={(e) => CheckAnswer(e, 2)}
          >
            {question.option2}
          </li>
          <li
            className={selectedOption === 3 ? (question.answer === 3 ? 'correct' : 'wrong') : ''}
            onClick={(e) => CheckAnswer(e, 3)}
          >
            {question.option3}
          </li>
          <li
            className={selectedOption === 4 ? (question.answer === 4 ? 'correct' : 'wrong') : ''}
            onClick={(e) => CheckAnswer(e, 4)}
          >
            {question.option4}
          </li>
        </ul>
        <button className="btn" onClick={handleNext}>Next</button>
      </div>
    </>
  );
};

export default Quiz;
