import axios from "axios";
import { useEffect, useState } from "react"
import { MovieCard } from "../components/MovieCard";

export function Movies(){

  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(()=>{
    const getMovies = async () =>{
      
      try{
        const movie_list = await axios.get('http://localhost:5000/now_playing/1', {
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        })
        setMovies(movie_list.data);
      }catch{
        alert('could not fetch movies')
      }
    }

    getMovies();
  }, [])

  return (
    <div className="grid grid-cols-4  gap-3 p-4 my-2" >
      {
        movies.map((movie)=>{
          const {title, overview, release_date, poster_path} = movie;
          return (<MovieCard movie={{title:title, overview:overview, release_date:release_date, poster_path:`https://image.tmdb.org/t/p/original/${poster_path}`}} />)
        })
      }
    </div>
  )
}