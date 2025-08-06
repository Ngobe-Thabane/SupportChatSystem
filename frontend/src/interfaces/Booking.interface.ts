export interface Booking{
    seats:Array<string>,    
}

export interface BookingModalProps {
  isOpen: boolean;
  cinemaName: string;
  selectedCount: number;
  onConfirm: () => void;
  onClose: () => void;
}

export interface UserBookings {
  booking_id:string,
  poster_url:string,
  booked_at:string,
  movie_title:string,
  movie_id:string,
  start_time:string,
  show_date:string,
  seat_number:string,
  theater_name:string,
  location:string
}