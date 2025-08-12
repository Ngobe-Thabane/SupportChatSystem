import { useNavigate } from "react-router";
import type { Movie } from "../interfaces/Movies.interface";
import { useAuthStore } from "../stores/useAuthStore";
import { useGenres } from "../stores/useMovieStore";

export function MovieCard({ movie }: { movie: Movie }) {

  const role = useAuthStore((state) => state.user?.role);
  const navigate = useNavigate();
  const genres = useGenres((state)=>state.genreList);
  const rating = movie.vote_average ?? 4.5;

  return (
    <div
      className="cursor-pointer w-[250px] transition-shadow duration-300 hover:shadow-2xl group transform-gpu hover:scale-[1.05]"
      onClick={() => {
        navigate("/movieDetails", { state: movie });
      }}
    >
      <div className="rounded bg-base-100 shadow-lg overflow-hidden relative">
        {/* Poster Image */}
        <div className="relative w-[250px] h-[300px]">
          <img
            src={movie.poster_url}
            alt="movie poster"
            className="w-full h-full object-cover opacity-70"
          />

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-semibold shadow-md">
            ⭐ {rating}
          </div>

          {/* Bottom overlay: genres + duration + age rating */}
          <div className="absolute bottom-0 left-0 w-full backdrop-blur bg-gradient-to-t to-black/35 from-transparent p-3 text-white">
            <h2 className="text-lg font-semibold line-clamp-1">{movie.title}</h2>

            <div className="flex flex-wrap text-xs mt-1 gap-2 opacity-90">
              {/* Genres */}
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-primary/80 px-2 py-0.5 rounded-full"
                >
                  {genres.find((gen)=>gen.genre_id === genre)?.name}
                </span>
              ))}

            </div>
          </div>

          {/* Book Now button (shows on hover) */}
          <button
            className="absolute bottom-20 right-1 bg-primary text-white px-4 py-1 rounded-md text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/booking/${movie.id}`);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
