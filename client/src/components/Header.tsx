import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

const Header = () => {
  const [user] = useAuthState(auth);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });


  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const logout = () => {
    auth.signOut();
  };

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-xl font-bold">Liviz - Life Visualized</h1>

        <nav className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-gray-300 font-semibold">Home</Link>
          <Link to="/about" className="hover:text-gray-300 font-semibold">About</Link>
          <Link to="/calculator" className="hover:text-gray-300 font-semibold">Calculator</Link>


          <button
            onClick={toggleDarkMode}
            className="ml-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {user ? (
            <>
              <span className="text-sm text-gray-300">
                Welcome, <span className="font-semibold">{user.email}</span>
              </span>
              <button
                onClick={logout}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
