import SocialMediaSlider from "../charts/SocialMediaSlider";
import CalendarGrid from "../components/CalendarGrid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Calculator = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Liviz Calculator</h1>

      <SocialMediaSlider />

      {user ? (
        <CalendarGrid />
      ) : (
        <p className="mt-8 text-center text-gray-600">
          Please <a href="/login" className="text-blue-600 underline">log in</a> to view your streak calendar.
        </p>
      )}
    </div>
  );
};

export default Calculator;
