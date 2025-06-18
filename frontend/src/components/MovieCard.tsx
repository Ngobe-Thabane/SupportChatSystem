import axios from "axios";
import type { Movie } from "../interfaces/Interface";

export function MovieCard({movie}:{movie:Movie}){

  const token = localStorage.getItem('token');
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

    if(addMovie.status === 201) alert('Movie added');
  }
  return (
    <div className="card bg-base-100 image-full w-96 shadow-sm">
      <figure>
        <img
          src={movie.poster_path}
          alt={movie.title}/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{movie.title}</h2>
        <p>{movie.overview}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={addMovie}>Add Movie</button>
        </div>
      </div>
    </div>
  )
}