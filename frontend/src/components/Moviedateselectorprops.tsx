import React, { useState, useEffect } from 'react';

export interface MovieSchedule {
  date: string;
  times: string[];
}

interface MovieDateSelectorProps {
  schedule: MovieSchedule[];
}

const MovieDateSelector: React.FC<MovieDateSelectorProps> = ({ schedule }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Automatically select the first date and its first time on mount
  useEffect(() => {
    if (schedule.length > 0) {
      const firstDate = schedule[0];
      setSelectedDate(firstDate.date);
      setSelectedTime(firstDate.times[0] || null);
    }
  }, [schedule]);

  const handleDateClick = (date: string) => {
    if (date === selectedDate) return;

    setSelectedDate(date);
    const dateEntry = schedule.find(s => s.date === date);
    setSelectedTime(dateEntry?.times[0] || null);
  };

  const selectedSchedule = schedule.find(s => s.date === selectedDate);

  return (
    <div className="py-3 max-w-md">
      <div className="flex gap-2 mb-4">
        {schedule.map((entry) => (
          <button
            key={entry.date}
            onClick={() => handleDateClick(entry.date)}
            className={`py-2 px-4 rounded border text-sm transition ${
              selectedDate === entry.date
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 hover:bg-blue-100'
            }`}
          >
            {new Date(entry.date).toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </button>
        ))}
      </div>

      {selectedSchedule && (
        <>
          <h3 className="text-lg font-medium mb-2 text-start">Available Times</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSchedule.times.map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-1 rounded border text-sm transition ${
                  selectedTime === time
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'text-white border-gray-300 hover:bg-blue-100'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDateSelector;
