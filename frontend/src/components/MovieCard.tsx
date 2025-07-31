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
    <div className="m-4 mb-8 px-4 w-[260px]">
      <div className="w-full h-[400px] rounded-lg bg-base-100 shadow-lg flex flex-col">
        <img
          src={movie.poster_url}
          alt="movie poster"
          className="h-72 w-full object-fit rounded-t-lg"
        />
        <div className="p-2 flex-1 flex flex-col justify-between">
          <Link to={`${!user ? "/moviedetails" : "/user/moviedetails"}`} state={movie}>
            <h2 className="mb-2 text-md font-semibold line-clamp-2">{movie.title}</h2>
          </Link>
          <div className="flex flex-wrap gap-2 mb-2">
            {movie.genres && role !== "admin" &&
              movie.genres.map((genre, i) => (
                <p key={i} className="badge">
                  {genre}
                </p>
              ))}
          </div>
          {role === "admin" && (
            <button
              className="btn btn-primary mt-auto"
              onClick={() => addMovie(movie, token as string)}
            >
              Add Movie
            </button>
          )}
        </div>
      </div>
    </div>
    </>

  )
}