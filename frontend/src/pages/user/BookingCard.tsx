import { Link } from "react-router";


export function BookingCard(){
	return (
		<div className="w-[250px] h-[300px] bg-base-200 rounded-lg shadow-md overflow-hidden flex flex-col">
			{/* Movie Poster */}
			<Link to="/movie/123" className=" w-full overflow-hidden">
				<img
					src="https://image.tmdb.org/t/p/original/A89x10Eqt43bPFEWPpbraWwkaFr.jpg"
					alt="Movie Poster"
					className="w-full h-full object-cover"
				/>
			</Link>

			{/* Card Content */}
			<div className="flex-1 p-3 flex flex-col justify-between">
				<div>
					<Link to="/movie/123" className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-1">
						Movie Title
					</Link>
					<p className="text-sm text-gray-600 mt-1">Show Time: Aug 10, 2025 - 7:30 PM</p>
					<p className="text-sm text-gray-600">Seats: A3, A4</p>
				</div>

				{/* Cancel Button */}
				<button
					className="mt-3 px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
				>
					Cancel Booking
				</button>
			</div>
		</div>

	)
}