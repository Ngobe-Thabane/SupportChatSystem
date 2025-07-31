import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieDeatilsHeroSection';
import BookingModal from '../components/BookingModal';
import type { Movie } from '../interfaces/Movies.interface';
import type { ShowtTimes } from '../interfaces/Showtimes.iterface';
import { getMovieShowTime } from '../lib/GetMovies';
import { useLocation } from 'react-router';

export default function MovieDetails(){
  const movieState = useLocation();
  const [activeCinemaId, setActiveCinemaId] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [movieShowtimes, setMovieShowtimes] = useState<Array<ShowtTimes>>([]);

  useEffect(()=>{
    const showTimes = async ()=>{
      const times = await getMovieShowTime(movieState.state.movie_id);
      setMovieShowtimes(times.data)
    }
    showTimes();
  }, [])

  const handleCinemaSelect = (cinema: ShowtTimes) => {
    if (cinema.showtime_id === activeCinemaId) {
      setActiveCinemaId(null);
      setSelectedSeats([]);
    } else {
      setActiveCinemaId(cinema.showtime_id);
      setSelectedSeats(new Array(cinema.seats.length).fill(false));
    }
  };

  const handleSeatToggle = (index: number) => {
    const updated = [...selectedSeats];
    updated[index] = !updated[index];
    setSelectedSeats(updated);
  };

  const handleBookClick = () => {
    if (selectedSeats.includes(true)) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmBooking = () => {
    setIsModalOpen(false);
    alert('Booking confirmed!');
    setActiveCinemaId(null);
    setSelectedSeats([]);
  };

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
        <h2 className="text-2xl font-semibold mb-4">Choose a Cinema</h2>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        cinemaName={
          movieShowtimes.find((cinema) => cinema.showtime_id === activeCinemaId)?.theater_name || ''
        }
        selectedCount={selectedSeats.filter(Boolean).length}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
};
