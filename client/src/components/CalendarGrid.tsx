import { useState, useEffect } from "react";
import classNames from "classnames";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const CURRENT_DATE = 25; // Simulated today for June 2025
const YEAR = 2025;
const MONTH = "06"; // June as "06"

const CalendarGrid = () => {
  const daysInMonth = 30;
  const [streaks, setStreaks] = useState<{ [key: number]: boolean }>({});
  const [user] = useAuthState(auth);

  const userDocPath = user ? `users/${user.uid}/streaks/${YEAR}-${MONTH}` : null;

  // Fetch saved streaks
  useEffect(() => {
    const fetchStreaks = async () => {
      if (!user || !userDocPath) return;
      const docRef = doc(db, userDocPath);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStreaks(docSnap.data() as { [key: number]: boolean });
      }
    };

    fetchStreaks();
  }, [user]);

  const toggleDay = async (day: number) => {
    const newStreaks = {
      ...streaks,
      [day]: !streaks[day],
    };
    setStreaks(newStreaks);

    // Save to Firestore
    if (user && userDocPath) {
      await setDoc(doc(db, userDocPath), newStreaks);
    }
  };

  if (!user) {
    return (
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow max-w-xl mx-auto mt-8 text-center">
        Please log in to save and view your streaks.
      </div>
    );
  }

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
                "w-10 h-10 flex items-center justify-center rounded cursor-pointer border select-none",
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
