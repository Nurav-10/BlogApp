const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-300 text-lg ">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
