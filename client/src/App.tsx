import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calculator from "./pages/Calculator";
import LifeChart from "./charts/LifeChart";
import AuthPage from "./pages/AuthPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [user, loading] = useAuthState(auth);

  // Show a loading screen while Firebase checks auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-6 bg-white">
          <Routes>
            {/* Default route redirects based on login status */}
            <Route
              path="/"
              element={
                user ? <Navigate to="/calculator" /> : <Navigate to="/login" />
              }
            />

            {/* Public login/signup page */}
            <Route path="/login" element={<AuthPage />} />

            {/* Protected route: Calculator */}
            <Route
              path="/calculator"
              element={user ? <Calculator /> : <Navigate to="/login" />}
            />

            {/* Optional route: LifeChart still public */}
            <Route path="/lifechart" element={<LifeChart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
