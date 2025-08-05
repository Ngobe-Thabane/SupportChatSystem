import React, { useEffect, useState } from "react";
import Table from "./Table";
import type { ShowtTimes } from "../../interfaces/Showtimes.iterface";
import { getMovieShowtimes } from "../../lib/GetMovies";

const ShowtimesTable: React.FC = () => {
  const [showtimes, setShowtimes] = useState<Array<ShowtTimes>>([]);

  useEffect(()=>{
    const getshowtimes = async ()=>{
      const showtimesList = await getMovieShowtimes();
      setShowtimes(showtimesList);
    }
    getshowtimes();
  })

  return (
    <>
    <h1 className="text-3xl font-bold mb-2">Showtimes</h1>
    <Table
      headers={["Movie", "Theater", "Time", "Actions"]}
      data={showtimes.map((s) => [
        s.movie_title,
        s.theater_name,
        s.start_time,
        <div className="space-x-2" key={s.showtime_id}>
          <button className="text-blue-600 hover:underline">
            Edit
          </button>
          <button className="text-red-600 hover:underline">
            Delete
          </button>
        </div>,
      ])}
    />
    </>
  );
};

export default ShowtimesTable;
