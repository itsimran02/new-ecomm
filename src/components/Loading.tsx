const LoadingSkeleton = () => {
  return (
    <div className="rounded-md py-5 px-5 shadow-md flex justify-center flex-col items-center animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-md mb-5"></div>
      <div className="w-full h-6 bg-gray-300 rounded-md mb-3"></div>
      <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-2"></div>
      <div className="w-full h-4 bg-gray-300 rounded-md mb-5"></div>
      <div className="flex justify-between w-full mt-5">
        <div className="w-1/4 h-6 bg-gray-300 rounded-md"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
