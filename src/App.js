import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 165ff929e667e7d4260b026a6015df15e9429c28'
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(error => console.error(error))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="layout">
        <div>
          {movies.map(movie => {
            return <h2>{movie}</h2>
          })}
        </div>
        <div>Movie Details</div>
      </div>
    </div>
  );
}

export default App;
