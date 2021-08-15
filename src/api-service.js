const TOKEN = "165ff929e667e7d4260b026a6015df15e9429c28"

export class API {
    static updateMovie(movieId, body) {
        return fetch(`http://127.0.0.1:8000/api/movies/${movieId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }, 
            body: JSON.stringify(body)
        }).then(resp => resp.json());
    }
    static createMovie(body) {
        return fetch(`http://127.0.0.1:8000/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }, 
            body: JSON.stringify(body)
        }).then(resp => resp.json());
    }
    static deleteMovie(movieId) {
        return fetch(`http://127.0.0.1:8000/api/movies/${movieId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }
        });
    }
}