import axios from "axios";
import { useEffect, useState } from "react"
import { MovieCard } from "../../components/MovieCard";
import { useAuthStore } from "../../stores/useAuthStore";
import Search from "../../shared/Search";
import PaginationControls from "../../shared/Pagination";

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
    <>
      <div className="grid  mx-3 gap-4 justify-center grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]" >
        {
          movies.map((movie)=>{
            const {id,vote_average ,title, overview, genre_ids, poster_path,release_date} = movie;
            return (<MovieCard movie={{id:id, vote_average:vote_average,title:title,release_date:release_date, description:overview,  genres:genre_ids,poster_url:`https://image.tmdb.org/t/p/original/${poster_path}`}} />)
          })
        }
      </div>
      <PaginationControls/>
    </>
  )
}