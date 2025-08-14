import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import CityCard from "../components/CityCard";

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
      if (!response.ok) {
        throw new Error("Failed to fetch data..!");
      }
      const data = await response.json();
      setNewCity(data);
    } catch (error) {
      console.log(`something went wrong: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const getCityForecast = async (lon, lat) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data..!");
      }
      const data = await response.json();
      setCityForecast(data);
    } catch (error) {
      console.log(`something went wrong: ${error}`);
    }
  };

  useEffect(() => {
    if (!city && lon && lat) {
      getCityByCoord(lon, lat);
    }
  }, [city, lon, lat]);

  useEffect(() => {
    if (lon && lat) {
      getCityForecast(lon, lat);
    }
  }, [lon, lat]);



  return (
    <div>
      {city ? (
        <CityCard city={city} />
      ) : loading ? (
        <p>Loading City data..!</p>
      ) : (
        <CityCard city={newCity} />
      )}

  {cityForecast?.list?.map((city, index) => {
      const date = new Date(city.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      return (
        <div key={index}>
          <p>{city.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
            alt={city.weather[0].description}
          />
          <p>{dayName}</p>
          <p>{formattedTime}</p>
        </div>
      );
    })}
    </div>
  );
};

export default City;
