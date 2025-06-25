import SocialMediaSlider from "../charts/SocialMediaSlider";
import CalendarGrid from "../components/CalendarGrid"; // ← Add this

const Calculator = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Liviz Calculator</h1>
      <SocialMediaSlider />
      <CalendarGrid /> {/* ← Render it here */}
    </div>
  );
};

export default Calculator;
