import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const LoadingSpinner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <ScaleLoader
        color="#e600ac" // A nice greenish-blue color (Light Sea Green)
        loading={isLoading}
        height={35} // Adjust height of individual bars
        width={4} // Adjust width of individual bars
        radius={2} // Slight rounding of bar edges
        margin={2} // Space between bars
        speedMultiplier={1.5} // Slightly faster animation
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
