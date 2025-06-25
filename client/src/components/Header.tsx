const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-xl font-bold">Liviz - Life Visualized</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:text-gray-300 font-semibold">Home</a>
          <a href="#" className="hover:text-gray-300 font-semibold">About</a>
          <a href="#" className="hover:text-gray-300 font-semibold">Calculator</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
