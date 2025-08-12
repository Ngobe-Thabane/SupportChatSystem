import { useState } from "react";
import { useGenres } from "../stores/useMovieStore";
import type { Movie } from "../interfaces/Movies.interface";
import type { MovieDetailsResponse } from "../stores/useMovieDetails";
import AddShowtimeModal from "../pages/admin/ShowtimeModal";

export default function MovieCard({ movie, data }: { movie: Movie; data: MovieDetailsResponse }) {
  const genres = useGenres((state) => state.genreList);
  const [isBookMovie, setBookMovie] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  // Convert runtime in minutes to "Xh:YY"
  const formatRuntime = (minutes: number | null | undefined) => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) {
    return `${mins}m`;
  }
  return `${hours}h:${mins.toString().padStart(2, "0")}m`;
};
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "TBA";
  const date = new Date(dateString);

  // Options for full month name and day, year
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};
  // Mock trailer URL (YouTube embed)
  const trailerUrl = "https://www.youtube.com/embed/8ugaeA-nMTc";

  return (
    <>
    {
      data &&
      <div className="flex flex-col lg:flex-row w-full bg-gradient-to-t from-transparent to-[#252525] shadow-md p-4 rounded-lg">
        {/* Poster */}
        <figure className="relative w-full -mt-20 ml-4 lg:w-1/3 cursor-pointer">
          <img
            src={movie.poster_url}
            alt="Movie Poster"
            className="rounded-xl border-4 border-gray-800 shadow-md w-[300px] h-[400px] object-cover"
            onClick={() => setShowTrailer(true)}
          />
          {/* Play Button */}
          <div
            onClick={() => setShowTrailer(true)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-3"
          >
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </figure>

        {/* Info Section */}
        <div className="flex flex-col flex-1 px-6">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold my-2">{movie.title}</h2>
            {data && (
              <div className="bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-semibold shadow-md">
                ⭐ {data.vote_average}
              </div>
            )}
          </div>

          {/* Tagline */}
          {data?.tagline && <p className="italic text-gray-400 mb-2">"{data.tagline}"</p>}

          {/* Genres */}
          <div className="flex flex-wrap gap-2 items-center mb-2">
            {movie.genres?.map((genreId: number, i) => (
              <p key={i} className="badge bg-primary">
                {genres?.find((genreDB) => genreDB.genre_id === genreId)?.name}
              </p>
            ))}
          </div>

          {/* Release Date & Runtime */}
          {data && (
            <p className="font-bold text-gray-400 my-2">
              Release date: {formatDate(data.release_date) ?? "TBA"} <br />
              Duration: {formatRuntime(data.runtime)}
            </p>
          )}

          {/* Overview */}
          <p className="text-sm my-2 text-gray-200 flex-1">{movie.description}</p>

          {/* Company Logos */}
          {data?.production_companies?.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-300">
                Production Companies:
              </h3>
              <div className="flex flex-wrap gap-4 my-2">
                {data.production_companies.map((company) => (
                  <div key={company.id} className="flex items-center gap-2">
                    {company.logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="h-6 object-contain"
                      />
                    ) : (
                    <span className="text-xs text-gray-400">{company.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Book Button */}
          <button className="self-end btn btn-primary mt-auto" onClick={() => setBookMovie(true)}>
            Book Now
          </button>
        </div>
      </div>

}
  {isBookMovie && <AddShowtimeModal showtime={isBookMovie}/>}
  {/* Trailer Modal */}
  {showTrailer && (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={() => setShowTrailer(false)}
    >
      <div
        className="relative w-[90vw] max-w-4xl aspect-video bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          width="100%"
          height="100%"
          src={trailerUrl + "?autoplay=1"}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button
          className="absolute top-2 right-2 text-white text-3xl font-bold"
          onClick={() => setShowTrailer(false)}
        >
          &times;
        </button>
      </div>
    </div>
  )}
    </>
  );
}
