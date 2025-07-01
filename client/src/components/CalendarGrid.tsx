import { useState, useEffect } from "react";
import classNames from "classnames";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatMonthYear(year: number, month: number) {
  return `${year}-${(month + 1).toString().padStart(2, "0")}`;
}

const CalendarGrid = () => {
  const [user] = useAuthState(auth);
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-based

  const [streaks, setStreaks] = useState<{ [key: number]: boolean }>({});

  const totalDays = daysInMonth(year, month);
  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();
  const currentDate = isCurrentMonth ? today.getDate() : null;

  const userDocPath = user
    ? `users/${user.uid}/streaks/${formatMonthYear(year, month)}`
    : null;

  useEffect(() => {
    const fetchStreaks = async () => {
      if (!user || !userDocPath) {
        setStreaks({});
        return;
      }
      const docRef = doc(db, userDocPath);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStreaks(docSnap.data() as { [key: number]: boolean });
      } else {
        setStreaks({});
      }
    };
    fetchStreaks();
  }, [user, userDocPath]);

  const toggleDay = async (day: number) => {
    const newStreaks = {
      ...streaks,
      [day]: !streaks[day],
    };
    setStreaks(newStreaks);

    if (user && userDocPath) {
      await setDoc(doc(db, userDocPath), newStreaks);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    // Don't allow going into the future beyond current month
    const next = new Date(year, month + 1);
    const current = new Date(today.getFullYear(), today.getMonth());
    if (next > current) return;

    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded shadow max-w-2xl mx-auto mt-8">

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="text-xl font-bold px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Previous month"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={nextMonth}
          className="text-xl font-bold px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Next month"
          disabled={new Date(year, month + 1) > today}
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2 text-center font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(new Date(year, month, 1).getDay())].map((_, i) => (
          <div key={"empty-" + i} />
        ))}

        {[...Array(totalDays)].map((_, i) => {
          const day = i + 1;
          const isToday = currentDate === day;
          const isCompleted = streaks[day];

          return (
            <div
              key={day}
              onClick={() => toggleDay(day)}
              className={classNames(
                "w-10 h-10 flex items-center justify-center rounded cursor-pointer border select-none",
                {
                  "bg-green-500 text-white": isCompleted,
                  "bg-yellow-400 text-black": isToday && !isCompleted,
                  "bg-white dark:bg-gray-700 dark:text-white": !isCompleted && !isToday,
                }
              )}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleDay(day);
              }}
              aria-pressed={isCompleted}
              aria-label={`Day ${day} ${
                isCompleted ? "completed" : "not completed"
              }`}
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
