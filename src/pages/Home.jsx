import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CityCard from "../components/CityCard";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const Home = () => {
  const [cityName, setCityName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [cities, setCities] = useState([]);
  const [searchedCity, setSearchedCity] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const IDs = [
    "1248991", // Colombo
    "1850147", // Tokyo
    "2644210", // Liverpool
    "2988507", // Paris
    "2147714", // Sydney
    "4930956", // Boston
    "1796236", // Shanghai
    "3143244", // Oslo
  ];

  const fetchWeather = async (ids) => {
    setLoading(true);
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

  const getCityByName = async (cityName) => {
    if (!triggerSearch) {
      return; // Skip useEffect unless fetchTrigger is true
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data..!");
      }
      const data = await response.json();
      setSearchedCity(data);
      console.log(data);
    } catch (error) {
      console.log(`something went wrong: ${error}`);
    } finally {
      setLoading(false);
      setTriggerSearch(false);
    }
  };

  useEffect(() => {
    fetchWeather(IDs);
  }, []);

  useEffect(() => {
    getCityByName(cityName);
  }, [cityName]);

  const navigate = useNavigate();

  const handleCityClick = (city) => {
    navigate("/city", { state: { city } });
  };

  const handleSearch = () => {
    if (!searchTerm == "") {
      setCityName(searchTerm);
      setTriggerSearch(true);
      console.log(searchTerm);
    }else{
      alert("Please Enter a City Name to Search!")
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            type="text"
            name="city"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button onClick={handleSearch}>
            {loading ? "loading" : "search"}
          </button>
        </div>
        {!searchedCity &&
          cities.map((city) => (
            <div key={city.name} onClick={() => handleCityClick(city)}>
              <CityCard city={city} />
            </div>
          ))}

        {searchedCity && (
          <div onClick={() => handleCityClick(searchedCity)}>
            <CityCard city={searchedCity} />
          </div>
        )}
      </header>
    </div>
  );
};

export default Home;
