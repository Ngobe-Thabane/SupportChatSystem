
import { useLocation } from "react-router";
import { useGenres, useTheaterList, type Cinema } from "../../stores/useMovieStore";
import {useState } from "react";
import { addMovie } from "../../lib/GetMovies";
import { useAuthStore } from "../../stores/useAuthStore";

export default function MovieSchedulePage(){
  const {state} = useLocation();
  const cinemas = useTheaterList((state)=>state.theatersList) as Cinema[];
  const genres = useGenres((state)=>state.genreList);
  const token = useAuthStore((state)=>state.user?.token);
  const [selectedCinema, setSelectedCinema] = useState<string>("");
  const [timeInput, setTimeInput] = useState<string>("");
  const [scheduledTimes, setScheduledTimes] = useState<{ cinema: Cinema; time: string }[]>([]);

  const handleAddTime = () => {
    if (!selectedCinema || !timeInput) return;

    const cinema = cinemas.find((c) => c.name === selectedCinema);
    if (!cinema) return;

    const exists = scheduledTimes.some(
      (entry) => entry.cinema.name === cinema.name && entry.time === timeInput
    );
    if (exists) return;

    setScheduledTimes([...scheduledTimes, { cinema, time: timeInput }]);
    setTimeInput("");
  };

  const addMovieShowtime = ()=>{
    const showtimes = scheduledTimes.map((times)=>{
      return {
        theater_id : times.cinema.theater_id,
        location : times.cinema.location,
        name: times.cinema.name,
        time: times.time,
        release_date:state.release_date
      }
    })
    addMovie(state, token as string, showtimes)
  }
  const handleRemoveTime = (index: number) => {
    const updated = [...scheduledTimes];
    updated.splice(index, 1);
    setScheduledTimes(updated);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">ShowTime Schedule</h1>
      <div className="flex">
        <div className="w-[400px] h-[500px]">
          <img src={state.poster_url} alt="" className="h-full"/>
        </div>
        <div className="max-w-5xl mx-auto w-[700px]">

          <div className="flex flex-col justify-between gap-2 mb-4">
            <h2 className="text-3xl font-bold">{state.title}</h2>
            <div className="badge badge-secondary text-sm p-2">PG-13</div>
          </div>

          <div className="text-gray-500 mb-2">
            <span className="font-semibold">Genres:</span>
            {
              state.genres.map((genre:number)=>{
                return <span className="badge mx-1 bg-blue-700/30 text-center">{genres.find((genreDB)=>genreDB.genre_id ===  genre)?.name}</span>
              })
            }
          </div>
          <div className="text-gray-500 mb-2">
            <span className="font-semibold">Release Date :</span> {state.release_date}
          </div>
          <p className="text-sm text-gray-200 mb-6">{state.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="form-control flex flex-col gap-3">
              <label className="label">
                <span className="label-text">Select Cinema</span>
              </label>
              <select
                className="select select-bordered"
                value={selectedCinema}
                onChange={(e) => setSelectedCinema(e.target.value)}
              >
                <option value="" disabled>
                  Choose a cinema
                </option>
                {cinemas && cinemas.map((cinema) => (
                  <option key={cinema.name} value={cinema.name}>
                    {cinema.name} ({cinema.location})
                  </option>
                ))}
              </select>
            </div>

            {/* Time Picker */}
            <div className="form-control flex flex-col gap-3">
              <label className="label">
                <span className="label-text">Add Show Time</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="time"
                  className="input input-bordered w-full"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                />
                <button type="button" className={`btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed`} disabled={!selectedCinema && !timeInput} onClick={handleAddTime}>
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Scheduled Times */}
          {scheduledTimes.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Scheduled Times</h3>
              <ul className="space-y-2">
                {scheduledTimes.map((entry, index) => (
                  <li
                    key={index}
                    className="bg-base-200 p-3 rounded-lg flex justify-between items-center shadow-md"
                  >
                    <div>
                      <p className="font-medium">
                        {entry.cinema.name} <span className="text-sm text-gray-500">({entry.cinema.location})</span>
                      </p>
                      <p className="text-sm text-gray-600">Show Time:      
                        {entry.time}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveTime(index)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Save Button */}
          {
            scheduledTimes.length > 0 &&
            <div className="form-control mt-8">
              <button className="btn btn-success w-full max-w-sm mx-auto loading" onClick={addMovieShowtime} >Schedule Showtime</button>
            </div>
          }
        </div>
      </div>
    </>
  );
};
