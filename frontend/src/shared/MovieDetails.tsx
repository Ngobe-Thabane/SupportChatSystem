import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieDeatil';
import type { ShowtTimes } from '../interfaces/Showtimes.iterface';
import { getMovieShowTime } from '../lib/GetMovies';
import { useLocation } from 'react-router';

export default function MovieDetails(){
  const movieState = useLocation();
  const [movieShowtimes, setMovieShowtimes] = useState<Array<ShowtTimes>>([]);

  useEffect(()=>{
    const showTimes = async ()=>{
      const times = await getMovieShowTime(movieState.state.movie_id);
      console.log(times.data)
      setMovieShowtimes(times.data.movieTime)
    }
    showTimes();
  }, [])


  return (
    <div className="bg-base-100 min-h-screen pb-20">
      <div
        className="w-full h-[400px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${movieState.state.poster_url})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative -mt-32 z-10">
        <MovieCard movie={movieState.state} />
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Choose a Cinema</h2>
      </div>
      <div className='flex gap-4 px-10'>
        {
          movieShowtimes.map((show)=>{
            return (
              <div className='bg-base-300 p-2 rounded shadow cursor-pointer'>
                <p className='text-lg bold'>{show.theater_name}</p>
                <p className='text-sm text-gray-500'>{show.location}</p>
              </div>
            )
          })
        }
      </div>
      {/* <BookingModal
        isOpen={isModalOpen}
        cinemaName={
          movieShowtimes.find((cinema) => cinema.showtime_id === activeCinemaId)?.theater_name || ''
        }
        selectedCount={selectedSeats.filter(Boolean).length}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBooking}
      /> */}
    </div>
  );
};
