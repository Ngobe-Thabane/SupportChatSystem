import { useEffect, useState } from 'react';
import CinemaList from './CinemaList';
import type { ShowtTimes } from '../interfaces/Showtimes.iterface';
import RenderSeats from './ShowSeats';
import MovieDateSelector, { type MovieSchedule } from './Moviedateselectorprops';
import { useNavigate } from 'react-router';
import { useSeats } from '../stores/useBookingStore';
import { useAuthStore } from '../stores/useAuthStore';
import { BookMovi } from '../lib/Booking';

export type Showtime = { time: string };
export type Seat = { id: number; label: string; selected: boolean };
export type WeekDay = { label: string; date: Date };

export default function BookingModal({cinemas}:{cinemas:Array<ShowtTimes>}) {

  
  const [showModal, setShowModal] = useState(true);
  const [selectedCinema, setSelectedCinema] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedShowtime, setSelectedShowtime] = useState(0);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [weekDays, setWeekDays] = useState<WeekDay[]>([]);
  const [filteredWeekDays, setFilteredWeekDays] = useState<WeekDay[]>([]);
  const [currentMonthYear, setCurrentMonthYear] = useState('');
  const scheduleData: MovieSchedule[] = cinemas.map((showTime)=>{
    return {date:showTime.show_date, times:[showTime.start_time]}
  });
  
  
  useEffect(() => {
    const today = new Date();
    const days: WeekDay[] = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return { label: d.toLocaleDateString(undefined, { weekday: 'short' }), date: d };
    });
    setWeekDays(days);
    setFilteredWeekDays(days);
    setCurrentMonthYear(
      days[0].date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    );
  }, []);
  
  if (!showModal) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100/85 backdrop-blur w-full max-w-6xl rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <CinemaList cinemas={cinemas} selectedCinema={selectedCinema} setSelectedCinema={(i) => {
          setSelectedCinema(i);
          setSelectedDay(0);
          setSelectedShowtime(0);
        }} />
        <div className="col-span-2 h-full">
          <div className='flex justify-between items-center mb-1'>
            <h3 className="text-lg font-semibold">Select Showtime and Seats</h3>
            <p className='text-gray-400'>{currentMonthYear}</p>
        </div>
          <MovieDateSelector schedule={scheduleData}/>
          <RenderSeats seats={[...cinemas[selectedCinema].seats]} />
          <ConfirmButton  /> 
        </div>
      </div>
    </div>
  );
}


export function ConfirmButton() {
  const navigate = useNavigate();
  const {showtime_id, seatsList} = useSeats((state)=>state)
  const token = useAuthStore((state)=>state.user?.token);
  return (
    <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer"
    onClick={async()=>{
      if(token){
        await BookMovi(showtime_id, seatsList, token as string);
        navigate('/user/bookings');
      }else{
        navigate('/login');
      }

    }}>
      Confirm Booking
    </button>
  );
}

