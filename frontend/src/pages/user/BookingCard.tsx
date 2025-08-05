import { Link } from "react-router";
import type { UserBookings } from "../../interfaces/Booking.interface";
import { useAuthStore } from "../../stores/useAuthStore";
import { cancelBooking } from "../../lib/Booking";


export function BookingCard({booking}:{booking:UserBookings}){
	const date = new Date(booking.show_date);
	const token = useAuthStore((state)=>state.token);
	return (
		<div className="w-[300px] h-[300px] bg-base-200 rounded-lg shadow-md overflow-hidden flex flex-col">
			{/* Movie Poster */}
			<Link to="/movie/123" className=" w-full overflow-hidden">
				<img
					src={booking.poster_url}
					alt="Movie Poster"
					className="w-[300px] h-[400px] object-cover"
				/>
			</Link>

			{/* Card Content */}
			<div className="flex-1 p-3 flex flex-col justify-between">
				<div>
					<Link to="/movie/123" className="text-lg font-semibold hover:text-blue-600 line-clamp-1">
						{booking.movie_title}
					</Link>
					<p className="text-sm mt-1 text-info">Show Date: {date.toDateString()}</p>
					<p className="text-sm mt-1 text-info">ShowTime: {booking.start_time}</p>
					<p className="text-sm text-info flex gap-1">Seats:{
					booking.seat_numbers.map((seat)=>{
						return <span>{seat}</span>
					})
					}</p>
				</div>

				{/* Cancel Button */}
				<button
					className="mt-3 px-3 py-1.5 bg-red-500/80 text-white text-sm cursor-pointer rounded hover:bg-red-600 transition-colors"
					onClick={()=>{
						cancelBooking(booking.booking_id, token as string)
					}}
				>
					Cancel Booking
				</button>
			</div>
		</div>

	)
}