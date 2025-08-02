
const SEATS_PER_ROW = 8;
const SEAT_ICON = "https://img.icons8.com/?size=100&id=53746&format=png&color=000000";
const RESERVED_ICON = "https://img.icons8.com/?size=100&id=WRsH9avTiko8&format=png&color=000000";

export default function Seat({seatLabel, j, isSelected,handleSeatClick}:{seatLabel:string, j:number, isSelected:boolean, handleSeatClick:(seatLabel:string)=>void}){

	const isAisle = SEATS_PER_ROW % 2 === 0 && j === SEATS_PER_ROW / 2 - 1;

	return (
		<>
		<div
			className="seat flex flex-col items-center cursor-pointer relative"
			onClick={() => handleSeatClick(seatLabel)}
			data-seat={seatLabel}>
			<img
				src={isSelected ? RESERVED_ICON : SEAT_ICON}
				className="w-10 transition-transform duration-300 hover:scale-110"
				alt={`Seat ${seatLabel}`}
				title={seatLabel}
			/>
			<div className="seat-label text-xs text-white mt-1 text-center">{seatLabel}</div>
		</div>
		{isAisle && <div className="w-6" />}
	</>
	)
}