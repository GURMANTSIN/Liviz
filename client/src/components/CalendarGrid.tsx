import { useState } from "react";
import classNames from "classnames";

const CURRENT_DATE = 25; // Assuming today is 25 June 2025

const CalendarGrid = () => {
  const daysInMonth = 30;
  const [streaks, setStreaks] = useState<{ [key: number]: boolean }>({});

  const toggleDay = (day: number) => {
    setStreaks(prev => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">June 2025 Streak Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isToday = day === CURRENT_DATE;
          const isCompleted = streaks[day];

          return (
            <div
              key={day}
              onClick={() => toggleDay(day)}
              className={classNames(
                "w-10 h-10 flex items-center justify-center rounded cursor-pointer border",
                {
                  "bg-green-500 text-white": isCompleted,
                  "bg-yellow-400 text-black": isToday && !isCompleted,
                  "bg-white": !isCompleted && !isToday,
                }
              )}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
