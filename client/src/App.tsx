import Header from "./components/Header";
import Footer from "./components/Footer";
import LifeChart from "./charts/lifeChart";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 bg-white">
        <h1 className="text-2xl font-bold text-center mb-8">How You Spend an 80-Year Life</h1>
        <div className="flex justify-center">
          <LifeChart />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
