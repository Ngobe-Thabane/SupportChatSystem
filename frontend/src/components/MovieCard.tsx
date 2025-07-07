import axios from "axios";
import type { Movie } from "../interfaces/Interface";
import { useState } from "react";
import { Toast } from "./Toast";

export function MovieCard({movie}:{movie:Movie}){

  const token = localStorage.getItem('token');
  const [isMovieAdded, setMovieAdded] = useState(false);
  const addMovie = async()=>{

    const data = {
      title: movie.title,
      description: movie.overview,
      image: movie.poster_path,
      genres: [],
      duration: 1
    }

    const addMovie = await axios.post('http://localhost:5000/movie',data, {
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`,
      }
    })

    if(addMovie.status === 200) {
      setMovieAdded(true);
    }
  }
  return (
    <>
      <Toast text="Movie added" action={isMovieAdded} />
      <div className="card bg-base-100 shadow-sm opacity-75 w-full max-w-xs">
        <figure className="h-64 overflow-hidden">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-base">{movie.title}</h2>
          <p className="text-sm line-clamp-3">{movie.overview}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm" onClick={addMovie}>Add Movie</button>
          </div>
        </div>
      </div>
    </>

  )
}