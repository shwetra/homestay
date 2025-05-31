// SkeletonLoader.js
const SkeletonLoader = ({ className = '' }) => {
    return (
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
        <div
        className={`animate-pulse bg-gray-200 rounded ${className}`}
      ></div>
        <div
        className={`animate-pulse bg-gray-200 rounded ${className}`}
      ></div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  