import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Quiz from './components/Quiz';
import Result from './components/Result';
import ResultTable from './components/ResultTable';
import './App.css'

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result-table" element={<ResultTable />} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
