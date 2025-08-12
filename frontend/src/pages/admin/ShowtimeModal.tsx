import React, { useEffect, useState } from "react";
import { useTheaterList } from "../../stores/useMovieStore";

const theaters = [
  "Grand Cinema",
  "Starplex",
  "Majestic Theater",
  "Downtown Movies",
];

type Showtime = {
  theater: string;
  date: string;
  time: string;
};

export default function AddShowtimeModal({showtime}:{showtime:boolean}) {
  const [isOpen, setIsOpen] = useState(showtime);
  const theaterList = useTheaterList((state)=>state.theatersList);
  const [selectedTheater, setSelectedTheater] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [showtimes, setShowtimes] = useState<Showtime[]>([]);


  const addShowtime = () => {
    if (!selectedTheater || !selectedDate || !selectedTime) return;
    setShowtimes((prev) => [
      ...prev,
      { theater: selectedTheater, date: selectedDate, time: selectedTime },
    ]);
    setSelectedTheater("");
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleSubmit = () => {
    alert("Submitting showtimes:\n" + JSON.stringify(showtimes, null, 2));
    setIsOpen(false);
    setShowtimes([]);
  };

  return (
    <>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur bg-opacity-40 flex justify-center items-center p-4 z-50">
          <div className="bg-base-200 rounded-lg shadow-lg max-w-5xl w-full max-h-[90vh] overflow-auto p-6 flex flex-col md:flex-row gap-6">
            {/* Left side: form */}
            <div className="flex-1 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Add Showtime</h2>

              {/* Theater Dropdown */}
              <label className="block">
                <span className="label-text">Theater</span>
                <select
                  className="select select-bordered w-full"
                  value={selectedTheater}
                  onChange={(e) => setSelectedTheater(e.target.value)}
                >
                  <option value="" disabled>
                    Select a theater
                  </option>
                  {theaterList?.map((t) => (
                    <option key={t.theater_id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* Date */}
              <label className="block">
                <span className="label-text">Date</span>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </label>

              {/* Time */}
              <label className="block">
                <span className="label-text">Time</span>
                <input
                  type="time"
                  className="input input-bordered w-full"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </label>

              {/* Add Showtime Button */}
              <button
                className="btn btn-secondary mt-4"
                onClick={addShowtime}
                disabled={
                  !selectedTheater || !selectedDate || !selectedTime
                }
              >
                Add Showtime
              </button>
            </div>

            {/* Right side: showtime list */}
            <div className="flex-1 border border-gray-500/50 rounded p-4 overflow-auto max-h-[50vh]">
              <h3 className="text-lg font-semibold mb-4">Showtimes Added</h3>
              {showtimes.length === 0 && (
                <p className="text-gray-500">No showtimes added yet.</p>
              )}
              <ul className="space-y-3">
                {showtimes.map((showtime, idx) => (
                  <li
                    key={idx}
                    className="border border-gray-400/50 rounded p-3 bg-base-100"
                  >
                    <p>
                      <strong>Theater:</strong> {showtime.theater}
                    </p>
                    <p>
                      <strong>Date:</strong> {showtime.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {showtime.time}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Submit button */}
              {showtimes.length > 0 && (
                <button
                  className="btn btn-primary mt-6 w-full"
                  onClick={handleSubmit}
                >
                  Submit Showtimes
                </button>
              )}
            </div>

            {/* Close modal button */}
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute top-3 right-3"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
