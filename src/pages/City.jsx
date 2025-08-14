import React from "react";
import { useLocation, useSearchParams } from "react-router";
import CityCard from "../components/CityCard";

const City = () => {
  const [searchParams] = useSearchParams();
  const lon = searchParams.get("lon") || "";
  const lat = searchParams.get("lat") || "";
  console.log(lon, lat);

  const location = useLocation();
  const city  = location.state?.city;
  return (
    <div>
      {city? <CityCard city={city}/> : <h1>city not available!</h1>}
      {/* <ul key={city.id} style={{ marginBottom: "1rem" }}>
        <li>Name: {city.name}</li>
        <li>Feels Like: {city.main.feels_like}</li>
        <li>Humidity: {city.main.humidity}</li>
        <li>Country: {city.sys.country}</li>
        <li>Icon: {city.weather[0].icon}</li>
        <img
          src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
          alt={city.weather[0].description}
        />
      </ul> */}
    </div>
  );
};

export default City;
