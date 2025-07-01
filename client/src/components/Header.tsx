import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Header = () => {
  const [user] = useAuthState(auth);

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
