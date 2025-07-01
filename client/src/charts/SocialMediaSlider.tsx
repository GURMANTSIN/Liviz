import { useState } from "react";

const SocialMediaSlider = () => {
  const [hours, setHours] = useState(2); // default usage

  const totalDaysPerYear = (hours * 365) / 24;

  return (
      <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded shadow max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Social Media Usage Calculator</h2>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="slider" className="text-sm"></label>
        <input
          id="slider"
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={hours}
          onChange={e => setHours(parseFloat(e.target.value))}
          className="w-2/3"
        />
      </div>
      <p className="text-center text-gray-700 dark:text-gray-300">
        You’ll spend <strong>{totalDaysPerYear.toFixed(1)} days</strong> per year on social media.
      </p>
    </div>
  );
};

export default SocialMediaSlider;
