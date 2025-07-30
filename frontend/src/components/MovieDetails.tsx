import React, { useState } from 'react';

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
  const backdropUrl = 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg';
  const posterUrl = backdropUrl;

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

  const confirmBooking = () => {
    // Simulate saving booking here
    setIsModalOpen(false);
    alert('Booking confirmed!');
    setActiveCinemaId(null);
    setSelectedSeats([]);
  };

  return (
    <div className="bg-base-100 min-h-screen text-base-content pb-20">
      {/* Backdrop */}
      <div
        className="w-full h-[400px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Movie Info Card */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative -mt-32 z-10">
        <div className="card lg:card-side bg-base-200 shadow-xl">
          <figure className="relative lg:w-1/3 -mt-20 ml-4">
            <img src={posterUrl} alt="Movie Poster" className="rounded-xl border-4 border-base-100 shadow-md" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl">The Batman</h2>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="badge badge-warning text-black">PG-13</div>
              <div className="badge badge-neutral">2022</div>
              <div className="badge badge-neutral">2h 56m</div>
              <div className="badge badge-primary">Action</div>
              <div className="badge badge-primary">Crime</div>
              <div className="badge badge-primary">Drama</div>
            </div>
            <p>
              In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own
              family while facing the serial killer known as the Riddler.
            </p>
            <div className="text-sm text-gray-400">
              <strong className="text-white">Rating:</strong> 8.2/10
            </div>
          </div>
        </div>
      </div>

      {/* Cinema Selection */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold mb-4">Choose a Cinema</h2>
        <ul className="space-y-4">
          {initialCinemas.map((cinema) => (
            <li key={cinema.id}>
              <div
                className={`p-4 rounded-lg cursor-pointer border ${
                  activeCinemaId === cinema.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-base-200 hover:bg-base-300 border-base-300'
                }`}
                onClick={() => handleCinemaSelect(cinema)}
              >
                <h3 className="text-lg font-semibold">{cinema.name}</h3>
                <p className="text-sm opacity-70">{cinema.location}</p>
              </div>

              {/* Seats for Selected Cinema */}
              {activeCinemaId === cinema.id && (
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium">Select your seats</h4>
                  <div className="grid grid-cols-8 gap-2">
                    {selectedSeats.map((isSelected, index) => (
                      <button
                        key={index}
                        className={`btn btn-xs ${
                          isSelected ? 'btn-success' : 'btn-outline btn-neutral'
                        }`}
                        onClick={() => handleSeatToggle(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4">
                    <button
                      className="btn btn-primary"
                      onClick={handleBookClick}
                      disabled={!selectedSeats.includes(true)}
                    >
                      Book {selectedSeats.filter(Boolean).length} seat
                      {selectedSeats.filter(Boolean).length > 1 && 's'}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Booking Confirmation Modal */}
      {isModalOpen && (
        <>
          <input type="checkbox" id="booking-modal" className="modal-toggle" checked readOnly />
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm Your Booking</h3>
              <p className="py-4">
                You're booking {selectedSeats.filter(Boolean).length} seat
                {selectedSeats.filter(Boolean).length > 1 && 's'} at{' '}
                {
                  initialCinemas.find((cinema) => cinema.id === activeCinemaId)?.name
                }.
              </p>
              <div className="modal-action">
                <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={confirmBooking}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;


