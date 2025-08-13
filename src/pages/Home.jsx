import React from "react";
import { useEffect, useState } from "react";

const api_key = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

const Home = () => {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const testApi = async () => {
    const ids = [
      "1248991", // Colombo
      "1850147", // Tokyo
      "2644210", // Liverpool
      "2988507", // Paris
      "2147714", // Sydney
      "4930956", // Boston
      "1796236", // Shanghai
      "3143244", // Oslo
    ];

    try {
      const requests = ids.map((id) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${api_key}`
        ).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch city ID ${id}`);
          return res.json();
        })
      );

      const results = await Promise.all(requests);
      setCities(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="App">
      <header className="App-header">
        {cities.map((city) => (
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
        ))}
      </header>
    </div>
  );
};

export default Home;
