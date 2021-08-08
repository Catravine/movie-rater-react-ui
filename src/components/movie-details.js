import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function MovieDetails(props) {

    const [highlighted, setHighlighted] = useState(-1);

    const movie = props.movie;
    const maxStars = 5;

    const highlightRate = high => event => {
        setHighlighted(high);
    }

    const rateClicked = rate => event => {
        fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 165ff929e667e7d4260b026a6015df15e9429c28'
            }, 
            body: JSON.stringify({ stars: rate + 1 })
        })
        .then(() => getDetails())
        .catch(error => console.error(error))
    }

    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 165ff929e667e7d4260b026a6015df15e9429c28'
            }
        })
        .then(resp => resp.json())
        .then(resp => props.updateMovie(resp))
        .catch(error => console.error(error))
    }

    return (
        <React.Fragment>
            { movie ? (
                <div>
                    <h1>{movie.title}</h1>
                    <p>{movie.description}</p>
                    {[...Array(maxStars)].map((e, i) => (
                        <FontAwesomeIcon 
                            key={i}
                            icon={faStar} 
                            className={movie.average_rating > i ? 'orange' : 'off' } 
                        />))}
                    ({movie.number_of_ratings})
                    <div className="rate-container">
                        <h2>Rate it</h2>
                        {[...Array(maxStars)].map((e, i) => {
                            return (
                                <FontAwesomeIcon 
                                    key={i}
                                    icon={faStar} 
                                    className={highlighted > i - 1 ? 'purple' : 'off' } 
                                    onMouseEnter={highlightRate(i)}
                                    onMouseLeave={highlightRate(-1)}
                                    onClick={rateClicked(i)}
                                />
                            )
                        })}
                    </div>
                </div>
            ) : null }
        </React.Fragment>
    )
}

export default MovieDetails;