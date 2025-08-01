import axios from "axios";
import type { Movie } from "../interfaces/Movies.interface";
import type { Cinema } from "../stores/useMovieStore";

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

export async function addMovie(movie:Movie, token:string, showtimes:Cinema[]) {
    const data = {movie:movie, showtimes:showtimes}
    console.log(data);
    console.log(token);
    // const addMovie = await axios.post('http://localhost:5000/movie',data, {
    //     headers:{
    //         "Content-Type":"application/json",
    //         "Authorization" : token
    //     }
    // });
    // return addMovie;
}

export async function getTheaterList() {
    const {data} = await axios.get('http://localhost:5000/theaters', options);
    return data.theaters;
}

export async function getGenres() {
    const {data} = await axios.get('http://localhost:5000/genres', options);
    return data;
}
