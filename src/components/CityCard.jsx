import React from "react";

const CityCard = ({ city }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-auto hover:scale-105 transform transition-all duration-200 cursor-pointer">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{city.name}</h2>
      <p className="text-gray-500 mb-4">{city.sys.country}</p>
      
      <div className="flex justify-center mb-4">
        <img
          src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
          alt={city.weather[0].description}
        />
      </div>

      <ul className="text-gray-700 space-y-1">
        <li><span className="font-semibold">Temperature:</span> {city.main.feels_like}°C</li>
        <li><span className="font-semibold">Humidity:</span> {city.main.humidity}%</li>
        {city.main.sea_level && (
          <li><span className="font-semibold">Sea Level:</span> {city.main.sea_level} hpa</li>
        )}
        <li><span className="font-semibold">Wind Speed:</span> {city.wind.speed} m/s</li>
        <li><span className="font-semibold">Summary:</span> {city.weather[0].description}</li>
      </ul>
    </div>
  );
};

export default CityCard;
