import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Result from './Result';
import './result.css'


const userName = localStorage.getItem('userName');

function ResultTable() {
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [remarks, setRemarks] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // const result = data.find(result => result.name === userName);


    useEffect(() => {
        const apiUrl = 'https://quiz-app-1-f9lg.onrender.com//results';

        axios.get(apiUrl)
            .then(response => {
                const data = response.data;
                console.log('Fetched results:', data); // Debug log
                const result = data.find(result => result.name === userName);

                if (result) {
                    setScore(result.score);
                    setTotalScore(result.totalScore);
                    setRemarks(result.remarks);
                } else {
                    setError('Result not found.');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching the score:', error);
                setError('Failed to fetch score.');
                setLoading(false);
            });
    }, [userName]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
         <div>
            <div className='contents'>
             <div className='flex-center'>
                 <h2> Quiz Result</h2>

            <div className='flex'>
                <span>Name : </span>
                <span className='bold' style={{ color: '#0cd570' }}>{userName}</span>
            </div>
            <div className='flex' >
                <span>Score : </span>
                <span className='bold' style={{ color: 'green' }}>{score}</span>
            </div>
            <div className='flex'>
                <span>Total Score :  </span>
                <span className='bold' style={{ color: 'green' }}> {totalScore}</span>
            </div>
            <div className='flex'>
                <span>Remarks :  </span>
                <span className='bold' style={{ color: 'green' }}> {remarks}</span>
            </div>

                    {/* <p>Name: <span>{userName}</span></p> */}
                    {/* <p>Your Score: {score}</p>
                    <p>Total Score: {totalScore}</p>
                    <p>Remarks: {remarks}</p> */}
                   </div>
            </div>
        </div>

        <div className='containerr'>
             <Result />
            </div>
       
        </>
    );
}

export default ResultTable;
