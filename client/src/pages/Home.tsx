import LifeChart from "../charts/LifeChart";

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Life in Years</h1>
      <p className="text-center text-gray-600 mb-10">
        This chart shows how the average person spends their lifetime.
      </p>
      <div className="flex justify-center">
        <LifeChart />
      </div>
    </div>
  );
};

export default Home;
