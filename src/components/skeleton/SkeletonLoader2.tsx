// SkeletonLoader.js
const SkeletonLoader2 = ({ className = '' }) => {
    return (
      <div className="grid sm:grid-cols-5 grid-cols-2 gap-5">
        <div
        className={`animate-pulse bg-gray-200 rounded ${className}`}
      ></div>
        <div
        className={`animate-pulse bg-gray-200 rounded ${className}`}
      ></div>
        <div
        className={`animate-pulse bg-gray-200 rounded ${className}`}
      ></div>
        <div
        className={`animate-pulse bg-gray-200 rounded ${className}`}
      ></div>
        <div
        className={`animate-pulse bg-gray-200 rounded ${className}`}
      ></div>
      </div>
    );
  };
  
  export default SkeletonLoader2;
  