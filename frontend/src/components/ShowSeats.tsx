import React, { type JSX, useEffect, useState } from 'react';
import type { Seats } from '../interfaces/Showtimes.iterface';
import Seat from './Seats';

const SEATS_PER_ROW = 8;
const ROWS = 8;
const ROW_LABELS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

export default function RenderSeats({seats}:{seats:Seats[]}){

  const leftBlock: JSX.Element[] = [];
  const rightBlock: JSX.Element[] = [];
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  useEffect(()=>{}, [seats]);

	const handleSeatClick = (seatLabel: string) => {

		const newSeats = new Set(selectedSeats);
		if (newSeats.has(seatLabel)) {
				newSeats.delete(seatLabel);
		} else {
				newSeats.add(seatLabel);
		}
		setSelectedSeats(newSeats);
	};

  for (let i = 0; i < ROWS; i++) {
    const row: JSX.Element[] = [];

    for (let j = 0; j < SEATS_PER_ROW; j++) {
      const seatLabel = `${ROW_LABELS[i]}${j + 1}`;
      const isReserved = seats.find(seat => seat.seat_number === seatLabel)?.is_reserved || false;
      const isSelected = selectedSeats.has(seatLabel);

      row.push(
        <React.Fragment key={seatLabel}>
          <Seat
            seatLabel={seatLabel}
            isSelected={isSelected}
            j={j}
            handleSeatClick={handleSeatClick}
          />
        </React.Fragment>
      );
    }

    const rowElement = <div key={`row-${i}`} className="flex gap-2 justify-center">{row}</div>;

    if (i < ROWS / 2) {
      leftBlock.push(rowElement);
    } else {
      rightBlock.push(rowElement);
    }
  }

  return (
    <div className="relative w-full mb-3 py-2 z-10 flex justify-center gap-16">
      <div className="flex flex-col gap-2">{leftBlock}</div>
      <div className="flex flex-col gap-2">{rightBlock}</div>
    </div>
  );
};
