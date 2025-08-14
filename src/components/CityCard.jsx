import React from "react";

const CityCard = ({ city }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full max-w-sm hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {city.name}, {city.sys.country}
      </h2>
      <div className="flex items-center justify-between mb-4">
        <img
          src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
          alt={city.weather[0].description}
          className="w-16 h-16"
        />
        <p className="text-lg font-semibold text-gray-600 capitalize">
          {city.weather[0].description}
        </p>
      </div>
      <ul className="text-gray-700 space-y-2">
        <li>
          <span className="font-medium">Feels Like:</span>{" "}
          {city.main.feels_like}°C
        </li>
        <li>
          <span className="font-medium">Humidity:</span> {city.main.humidity}%
        </li>
        <li>
          <span className="font-medium">Sea Level:</span>{" "}
          {city.main.sea_level || "N/A"} hPa
        </li>
        <li>
          <span className="font-medium">Wind Speed:</span> {city.wind.speed} m/s
        </li>
      </ul>
    </div>
  );
};

export default CityCard;
