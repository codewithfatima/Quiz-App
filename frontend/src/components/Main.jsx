import React, { useRef, useState  } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './Main.css';

export default function Main() {
   const [name , setName] = useState('');
   const navigate = useNavigate();

   const handleSubmit= (e) =>{
    e.preventDefault();
    if(name.trim() == ''){
      alert("Plz Enter your name ");
       return ;
    }
    localStorage.setItem('userName', name);
    navigate('/quiz');

   }
 
  return (
    <div className='containerr'>
      <h1 className='logo'> ﷽ </h1>
      <p className='content'>Welcome!! to Our Basic Islamic Quiz. <br />
     <br />
      Test Your Knowledge and Discover More About Islam.. <br />
      its very easy so let start the Quiz... 
      </p>
       
      <form id="form">
        <input
          className="userid" 
          type="text"
          placeholder='Username*'
          value={name}
          onChange={(e) =>{setName(e.target.value)}}
         />
      </form>
      <div >
        <Link className='start'  onClick={handleSubmit} >Start Quiz</Link>
      </div>
    </div>
  );
}
