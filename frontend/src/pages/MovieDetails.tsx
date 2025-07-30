import React, { useState } from 'react';
import MovieCard from '../components/MovieBackgoundCard';
import CinemaList from '../components/CinemaList';
import BookingModal from '../components/BookingModal';

interface Cinema {
  id: number;
  name: string;
  location: string;
  seats: boolean[];
}

const initialCinemas: Cinema[] = [
  {
    id: 1,
    name: 'Cineworld Downtown',
    location: '123 Main St, City Center',
    seats: new Array(30).fill(false),
  },
  {
    id: 2,
    name: 'Regal Cinemas Westside',
    location: '456 West Ave, Suburbia',
    seats: new Array(20).fill(false),
  },
  {
    id: 3,
    name: 'Skyline IMAX',
    location: '789 Sunset Blvd, Hillside',
    seats: new Array(25).fill(false),
  },
];

const MovieDetails: React.FC = () => {
  const posterUrl = 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg';

  const [activeCinemaId, setActiveCinemaId] = useState<number | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCinemaSelect = (cinema: Cinema) => {
    if (cinema.id === activeCinemaId) {
      setActiveCinemaId(null);
      setSelectedSeats([]);
    } else {
      setActiveCinemaId(cinema.id);
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
        style={{ backgroundImage: `url(${posterUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative -mt-32 z-10">
        <MovieCard posterUrl={posterUrl} />
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold mb-4">Choose a Cinema</h2>
        <CinemaList
          cinemas={initialCinemas}
          activeCinemaId={activeCinemaId}
          selectedSeats={selectedSeats}
          onCinemaSelect={handleCinemaSelect}
          onSeatToggle={handleSeatToggle}
          onBookClick={handleBookClick}
        />
      </div>

      <BookingModal
        isOpen={isModalOpen}
        cinemaName={
          initialCinemas.find((cinema) => cinema.id === activeCinemaId)?.name || ''
        }
        selectedCount={selectedSeats.filter(Boolean).length}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
};

export default MovieDetails;
