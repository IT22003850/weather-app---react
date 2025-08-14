import React from "react";

const NotFound = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-4">Sorry, the page you are looking for does not exist.</p>
      <a
        href="/"
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Back to Home
      </a>
    </div>
  );
};

export default NotFound;