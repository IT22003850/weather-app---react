import React from "react";
import {
  FaTemperatureHigh,
  FaWater,
  FaWind,
  FaGlobeAmericas,
  FaInfoCircle,
} from "react-icons/fa";
import { WiCloud, WiHumidity, WiBarometer } from "react-icons/wi";

const CityCard = ({ city }) => {
  return (
    <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col gap-3 w-full max-w-sm mx-auto border border-white/20 hover:scale-105 transition-transform duration-300">
      {/* City & Country */}
      <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-900 drop-shadow">
        <FaGlobeAmericas className="text-blue-600" />
        {city.name}, {city.sys.country}
      </h2>

      {/* Weather Condition */}
      <div className="flex items-center gap-2 text-lg capitalize text-gray-800">
        <WiCloud className="text-gray-600 text-2xl" />
        {city.weather[0].description}
      </div>

      {/* Temperature */}
      <div className="flex items-center gap-2 text-lg text-gray-800">
        <FaTemperatureHigh className="text-red-500" />
        Temperature: {city.main.feels_like}°C
      </div>

      {/* Humidity */}
      <div className="flex items-center gap-2 text-lg text-gray-800">
        <WiHumidity className="text-blue-400" />
        Humidity: {city.main.humidity}%
      </div>

      {/* Sea Level */}
      {city.main.sea_level && (
        <div className="flex items-center gap-2 text-lg text-gray-800">
          <WiBarometer className="text-indigo-500" />
          Sea Level: {city.main.sea_level} hpa
        </div>
      )}

      {/* Wind Speed */}
      <div className="flex items-center gap-2 text-lg text-gray-800">
        <FaWind className="text-teal-500" />
        Wind Speed: {city.wind.speed} m/s
      </div>

      {/* Summary */}
      <div className="flex items-center gap-2 text-lg text-gray-800">
        <FaInfoCircle className="text-gray-500" />
        Summary: {city.weather[0].description}
      </div>

      {/* Weather Icon */}
      <div className="flex justify-center mt-4">
        <img
          src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
          alt={city.weather[0].description}
          className="w-24 h-24 drop-shadow-lg"
        />
      </div>
    </div>
  );
};

export default CityCard;
