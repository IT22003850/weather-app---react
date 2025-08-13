import React from "react";
import { useLocation } from "react-router";

const City = () => {
    const location = useLocation()
    const {city} = location.state;
  return (
    <div>
      <ul key={city.id} style={{ marginBottom: "1rem" }}>
        <li>Name: {city.name}</li>
        <li>Feels Like: {city.main.feels_like}</li>
        <li>Humidity: {city.main.humidity}</li>
        <li>Country: {city.sys.country}</li>
        <li>Icon: {city.weather[0].icon}</li>
        <img
          src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
          alt={city.weather[0].description}
        />
      </ul>
    </div>
  );
};

export default City;
