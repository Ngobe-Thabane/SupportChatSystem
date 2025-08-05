import { BookingCard } from "./BookingCard";

export function Bookings(){
	return (
		<>
			<div className="flex gap-1 m-4">
				<button className="btn btn-outline btn-sm">Current Bookings</button>
				<button className="btn btn-outline btn-sm">Canceled Bookings</button>
			</div>
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
			<BookingCard />
		</div>
		</>
	)
}