
import type { ShowtTimes } from '../interfaces/Showtimes.iterface';
import { useSeats } from '../stores/useBookingStore';

interface Props {
  cinemas: Array<ShowtTimes>;
  selectedCinema: number;
  setSelectedCinema: (index: number) => void;
}

export default function CinemaList({ cinemas, selectedCinema, setSelectedCinema }: Props) {
  const setShowTime = useSeats((state)=>state.setShowTime);
  setShowTime(cinemas[0].showtime_id);
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Choose Cinema</h3>
      {cinemas.map((cinema, index) => (
        <button
          key={index}
          className={`w-full text-left px-4 py-2 rounded mb-2 hover:bg-black ${
            selectedCinema === index ? 'bg-blue-600 text-white' : ''
          }`}
          onClick={() =>{ 
            setSelectedCinema(index)
            setShowTime(cinema.showtime_id);
          }}
        >
          {cinema.theater_name}
        </button>
      ))}
    </div>
  );
}
