import { useEffect, useState } from "react";
import { BookingCard } from "./BookingCard";
import type { UserBookings } from "../../interfaces/Booking.interface";
import { useAuthStore } from "../../stores/useAuthStore";
import { getUserBookind } from "../../lib/Booking";

export function Bookings(){
	const [userBookings, setUserBookings] = useState<Array<UserBookings>>([])
	const token = useAuthStore((state)=>state.token);
	useEffect(()=>{
		const getBookings = async ()=>{
			const bookings = await getUserBookind(token as string);
			setUserBookings(bookings);
		}
		getBookings()
	})
	return (
		<>
		<div className="grid mx-3 min-h-screen my-4 gap-2 justify-center grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
			{
				userBookings.map((booking)=>{
					return <BookingCard booking={booking}/>
				})
			}
		</div>
		</>
	)
}