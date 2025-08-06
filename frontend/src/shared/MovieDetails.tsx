import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieDeatil';
import type { ShowtTimes } from '../interfaces/Showtimes.iterface';
import { getMovieShowTime } from '../lib/GetMovies';
import { Link, useLocation } from 'react-router';
import MovieReviews from '../pages/user/MovieReviws';

export default function MovieDetails(){
  const movieState = useLocation();
  const [movieShowtimes, setMovieShowtimes] = useState<Array<ShowtTimes>>([]);

  useEffect(()=>{
    const showTimes = async ()=>{
      const times = await getMovieShowTime(movieState.state.movie_id);
      setMovieShowtimes(times.data.movieTime)
    }
    showTimes();
  }, [])


  return (
    <>
      <div className="bg-base-100 min-h-screen ">
        <div
          className="w-full h-[300px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${movieState.state.poster_url})` }}
        >
    <div className="absolute inset-0 bg-black/60 " />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative -mt-32 z-10">
          <MovieCard movie={movieState.state} movieShowtimes={movieShowtimes} />
        </div>
      
      </div>
      {/* <MovieReviews/> */}
    </>
  );
};
