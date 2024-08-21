import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './result.css'
const userName = localStorage.getItem('userName');


const Results = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch('https://quiz-app-1qt6.onrender.com/results');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setResults(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <button className="bte" onClick={() => navigate('/')}>Restart Quiz</button>
            {results.length === 0 ? (
                <p>No results available</p>
            ) : (
                <table >
                    <thead className='table-header'>
                        <tr>
                            <th>Name </th>
                            <th>Score</th>
                            <th>Total Score</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {results.map((result) => (
                            <tr key={result.id}>
                                <td>{result.name}</td>
                                <td>{result.score}</td>
                                <td>{result.totalScore}</td>
                                <td>{result.remarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Results;


 