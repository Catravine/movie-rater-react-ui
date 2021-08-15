import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

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

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const updatedMovie = movie => {
    const newMovies = movies.map(mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    });
    setMovies(newMovies);
  }

  const newMovie = () => {
    setEditedMovie({
      title: '',
      description: ''
    });
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  }

  const removeClicked = movie => {
    const newMovies = movies.filter(mov => mov.id !== movie.id)
    setMovies(newMovies);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="layout">
        <div>
          <MovieList 
            movies={movies} 
            movieClicked={loadMovie} 
            editClicked={editClicked} 
            removeClicked={removeClicked}
          />
          <button onClick={newMovie}>New Movie</button>
        </div>
        {selectedMovie ? <MovieDetails movie={selectedMovie} updateMovie={loadMovie} /> : null }
        {editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated} /> : null}
      </div>
    </div>
  );
}

export default App;
