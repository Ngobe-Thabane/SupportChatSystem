import axios from "axios";
import type { Movie } from "../interfaces/Movies.interface";

export const options = {headers:{"Content-Type":"application/json"}}
export async function getMovies(){

    const movies = await axios.get('http://localhost:5000/movies', options)
    return movies;

}

export async function getMovieShowtime() {

    const moviesShowtimes = await axios.get('', options);
    return moviesShowtimes;

}


export async function getMovieShowTime(movie_id:string) {
    const movieShowTimes = await axios.get(`http://localhost:5000/movieShowTime/${movie_id}`, {
        headers:{"Content-Type":"application/json"}
    }
    );
    return movieShowTimes;
}

export async function addMovie(movie:Movie, token:string) {
    const addMovie = await axios.post('http://localhost:5000/movie',movie, {
        headers:{
            "Content-Type":"application/json",
            "Authorization" : token
        }
    });
    return addMovie;
}