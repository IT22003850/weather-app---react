import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import CityCard from "../components/CityCard";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
      {city ? (
        <CityCard city={city} />
      ) : loading ? (
        <p>Loading City data..!</p>
      ) : (
        <CityCard city={newCity} />
      )}

      {/* Forecast Swiper */}
      {cityForecast?.list && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">5-Day Forecast</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {cityForecast.list.map((forecast, index) => {
              const date = new Date(forecast.dt * 1000);
              const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
              const formattedTime = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });

              return (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                    <p className="text-lg font-semibold">{forecast.main.temp}°C</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                      alt={forecast.weather[0].description}
                    />
                    <p className="text-sm text-gray-600">{dayName}</p>
                    <p className="text-xs text-gray-500">{formattedTime}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default City;
