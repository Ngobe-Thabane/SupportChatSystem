import { Link } from 'react-router';
import type { Movie } from '../interfaces/Movies.interface';
import type { ShowtTimes } from '../interfaces/Showtimes.iterface';
import { useGenres } from '../stores/useMovieStore';
import { useState } from 'react';
import BookingModal from './BookingModal';

export default function MovieCard({ movie, movieShowtimes }:{movie:Movie, movieShowtimes:Array<ShowtTimes>}){

  const genres = useGenres((state)=>state.genreList);
  const [isBookMovie, setBookMovie] = useState(false);
  console.log(movieShowtimes)

  return (
    <div className="flex flex-col lg:flex-row w-full bg-gradient-to-t from-transparent to-[#252525] shadow-md p-4 rounded-lg">
  <figure className="relative w-full h-full -mt-20 ml-4 lg:w-1/3">
    <img
      src={movie.poster_url}
      alt="Movie Poster"
      className="rounded-xl border-4 border-gray-800 shadow-md w-[300px] h-[400px] object-cover"
    />
  </figure>
  <div className="flex flex-col  flex-1">
    <h2 className="text-3xl font-bold my-2">{movie.title}</h2>
    <div className="flex flex-wrap gap-2 items-center">
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
    <p className="text-sm my-2 text-gray-200 flex-1">{movie.description}</p>
    <button className='self-end btn btn-primary' onClick={()=>setBookMovie(true)}>Book Now</button>
    {
      isBookMovie && <BookingModal cinemas={movieShowtimes} />
    }
  </div>
</div>

  );
};
