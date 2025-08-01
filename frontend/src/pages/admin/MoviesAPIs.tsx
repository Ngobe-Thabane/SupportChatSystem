import axios from "axios";
import { useEffect, useState } from "react"
import { MovieCard } from "../../components/MovieCard";
import { useAuthStore } from "../../stores/useAuthStore";

export function Movies(){

  const [movies, setMovies] = useState([]);
  const token = useAuthStore((state)=>state.user?.token);
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
          const {title, overview, genre_ids, poster_path,release_date} = movie;
          console.log(movie)
          return (<MovieCard movie={{title:title,release_date:release_date, description:overview,  genres:genre_ids,poster_url:`https://image.tmdb.org/t/p/original/${poster_path}`}} />)
        })
      }
    </div>
  )
}