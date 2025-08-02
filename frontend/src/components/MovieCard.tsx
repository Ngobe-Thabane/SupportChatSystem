import { useNavigate } from "react-router";
import type { Movie } from "../interfaces/Movies.interface";
import { useAuthStore } from "../stores/useAuthStore";
import { useGenres } from "../stores/useMovieStore";

export function MovieCard({movie}:{movie:Movie}){
   const role = useAuthStore((state) => state.user?.role);
   const genres = useGenres((state)=>state.genreList);
   const navigate = useNavigate();

  return (
    <>
    <div className="cursor-pointer w-full" onClick={()=>{
      if(role == 'user'){
        navigate('/user/moviedetails',{state:movie});
      }else if(role == 'admin'){
        navigate('/admin/addMovie', {state:movie});
      }else{
        navigate('/movieDetails', {state:movie});
      }
    }}>
      <div className="w-[250px] h-full rounded-lg bg-base-100 shadow-lg flex flex-col">
        <img
          src={movie.poster_url}
          alt="movie poster"
          className="w-[250px] h-[300px] object-cover rounded-t-lg"
        />
        <div className="py-2 flex-1 flex flex-col justify-between">
          <h2 className="mb-2 text-md font-semibold line-clamp-1">{movie.title}</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {movie.genres &&
              movie.genres.map((genre:number, i) => (
                <>
                {
                  genres?.length > 0 &&
                <p key={i} className="badge">
                  { genres?.find((genreDB) => genreDB.genre_id == genre)?.name}
                </p>
                }
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
    </>

  )
}