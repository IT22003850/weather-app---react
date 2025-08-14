import React from "react";

const Spinner = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
