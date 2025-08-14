import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import CityCard from "../components/CityCard";
import Spinner from "../components/Spinner";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const City = () => {
  const [newCity, setNewCity] = useState();
  const [cityForecast, setCityForecast] = useState();
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const lon = searchParams.get("lon") || "";
  const lat = searchParams.get("lat") || "";
  const location = useLocation();
  const city = location.state?.city || null;

  const getCityByCoord = async (lon, lat) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
      );
      if (!response.ok) throw new Error("Failed to fetch data..!");
      const data = await response.json();
      setNewCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCityForecast = async (lon, lat) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
      );
      if (!response.ok) throw new Error("Failed to fetch data..!");
      const data = await response.json();
      setCityForecast(data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  if (city) {
    // If city is already passed from Home, no need to fetch again
    setNewCity(city);
    setLoading(false);
  } else if (lon && lat) {
    getCityByCoord(lon, lat);
  }
}, [city, lon, lat]);


  useEffect(() => {
    if (lon && lat) getCityForecast(lon, lat);
  }, [lon, lat]);

  if (loading) return <Spinner />;

  return (
    <div>
      {city ? <CityCard city={city} /> : <CityCard city={newCity} />}

      <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-4">Forecast</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {cityForecast?.list?.map((fc, index) => {
          const date = new Date(fc.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-4 min-w-[150px] flex-shrink-0 text-center"
            >
              <p className="text-lg font-bold">{fc.main.temp}°C</p>
              <img
                src={`https://openweathermap.org/img/wn/${fc.weather[0].icon}@2x.png`}
                alt={fc.weather[0].description}
                className="mx-auto"
              />
              <p className="text-gray-500">{dayName}</p>
              <p className="text-gray-400">{formattedTime}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default City;
