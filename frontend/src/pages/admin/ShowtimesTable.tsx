import React, { useEffect, useState } from "react";
import Table from "./Table";
import type { ShowtTimes } from "../../interfaces/Showtimes.iterface";
import { getMovieShowtimes } from "../../lib/GetMovies";
import { Pencil, Trash } from "lucide-react";

const ShowtimesTable: React.FC = () => {
  const [showtimes, setShowtimes] = useState<Array<ShowtTimes>>([]);

  const deleteShowTime = (id:string)=>{
    const times = showtimes.filter((time)=>{
      return time.showtime_id != id;
    })
    setShowtimes(times)
  }
  useEffect(()=>{
    const getshowtimes = async ()=>{
      const showtimesList = await getMovieShowtimes();
      setShowtimes(showtimesList);
    }
    getshowtimes();
  },[])

  return (
    <>
    <h1 className="text-3xl font-bold m-4">Showtimes</h1>
    <Table
      headers={["Movie", "Theater", "Time", "Actions"]}
      data={showtimes.map((s) => [
        s.movie_title,
        s.theater_name,
        s.start_time,
        <div className="space-x-2 flex gap-3" key={s.showtime_id}>
          <button className="text-blue-600 hover:underline">
            <Pencil/>
          </button>
          <button className="text-red-600 hover:underline" onClick={()=>{
            deleteShowTime(s.showtime_id);
          }}>
            <Trash/>
          </button>
        </div>,
      ])}
    />
    </>
  );
};

export default ShowtimesTable;
