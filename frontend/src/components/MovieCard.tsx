import { Link } from "react-router";
import type { Movie } from "../interfaces/Movies.interface";
import { useAuthStore } from "../stores/useAuthStore";
import { addMovie } from "../lib/GetMovies";

export function MovieCard({movie}:{movie:Movie}){
   const user = useAuthStore((state) => state.user);
   const token = useAuthStore((state)=>state.user?.token);
   const role = useAuthStore((state) => state.user?.role);
  return (
    <>
      <div className="m-4 mb-8 px-4 w-fit bg-base-100">
        <div className="rounded-lg bg-base-100 shadow-lg">
          <img src={movie.poster_url} alt="movie poster" className="rounded-t-lg h-96" />
          <div className="p-2">
            <Link to={`${!user ? '/moviedetails': '/user/moviedetails'}`} state={movie}>
              <h2 className="mb-2 text-md font-semibold">{movie.title}</h2>
            </Link>
            <div className="flex gap-3">
              {
                movie.genres && role !== 'admin' && movie.genres.map((genre)=>{
                  return <p className="badge">{genre}</p>
                })
              }
            </div>
            {
              role === 'admin' && <button className="btn btn-primary" onClick={()=>{
                addMovie(movie, token as string)
              }}>Add Movie</button>
            }
          </div>
        </div>
      </div>
    </>

  )
}