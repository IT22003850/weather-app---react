import React from "react";

const CityCard = ({ city }) => {
  return (
    <div>
      <li>Name: {city.name}</li>
      <li>Feels Like: {city.main.feels_like}</li>
      <li>Humidity: {city.main.humidity}</li>
      <li>Country: {city.sys.country}</li>
      <li>Sea Level: {city.main.sea_level} hpa</li>
      <li>Wind speed: {city.wind.speed}</li>
      <li>Icon: {city.weather[0].icon}</li>
      <li>Summary: {city.weather[0].description}</li>
      <img
        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
        alt={city.weather[0].description}
      />
    </div>
  );
};

export default CityCard;
