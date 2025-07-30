import React from 'react';

interface Cinema {
  id: number;
  name: string;
  location: string;
  seats: boolean[];
}

interface CinemaListProps {
  cinemas: Cinema[];
  activeCinemaId: number | null;
  selectedSeats: boolean[];
  onCinemaSelect: (cinema: Cinema) => void;
  onSeatToggle: (index: number) => void;
  onBookClick: () => void;
}

const CinemaList: React.FC<CinemaListProps> = ({
  cinemas,
  activeCinemaId,
  selectedSeats,
  onCinemaSelect,
  onSeatToggle,
  onBookClick,
}) => {
  return (
    <ul className="space-y-4">
      {cinemas.map((cinema) => (
        <li key={cinema.id}>
          <div
            className={`p-4 rounded-lg cursor-pointer border ${
              activeCinemaId === cinema.id
                ? 'bg-primary text-white border-primary'
                : 'bg-base-200 hover:bg-base-300 border-base-300'
            }`}
            onClick={() => onCinemaSelect(cinema)}
          >
            <h3 className="text-lg font-semibold">{cinema.name}</h3>
            <p className="text-sm opacity-70">{cinema.location}</p>
          </div>

          {activeCinemaId === cinema.id && (
            <div className="mt-4">
              <h4 className="mb-2 text-sm font-medium">Select your seats</h4>
              <div className="grid grid-cols-8 gap-2">
                {selectedSeats.map((isSelected, index) => (
                  <button
                    key={index}
                    className={`btn btn-xs ${isSelected ? 'btn-success' : 'btn-outline btn-neutral'}`}
                    onClick={() => onSeatToggle(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <button
                  className="btn btn-primary"
                  onClick={onBookClick}
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
  );
};

export default CinemaList;
