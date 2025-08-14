import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CityCard from "../components/CityCard";
import Spinner from "../components/Spinner";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const Home = () => {
  const [cityName, setCityName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [cities, setCities] = useState([]);
  const [searchedCity, setSearchedCity] = useState();
  const [userCity, setUserCity] = useState(); // <-- user's location city
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const DEFAULT_CITY_IDS = [
    "1248991", "1850147", "2644210", "2988507",
    "2147714", "4930956", "1796236", "3143244"
  ];

  const fetchWeather = async (ids) => {
    try {
      setLoading(true);
      const requests = ids.map((id) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${api_key}&units=metric`
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
    if (!triggerSearch) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`
      );
      if (!res.ok) throw new Error("Failed to fetch data..!");
      const data = await res.json();
      setSearchedCity(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTriggerSearch(false);
    }
  };

  const getCityByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
      );
      if (!res.ok) throw new Error("Failed to fetch user's city");
      const data = await res.json();
      setUserCity(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch default cities
  useEffect(() => { fetchWeather(DEFAULT_CITY_IDS); }, []);

  // Fetch city by search
  useEffect(() => { getCityByName(cityName); }, [cityName]);

  // Detect user location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityByCoords(latitude, longitude);
        },
        (err) => console.log("Geolocation error:", err)
      );
    }
  }, []);

  const navigate = useNavigate();
  const handleCityClick = (city) => {
    navigate(`/city?lon=${city.coord.lon}&lat=${city.coord.lat}`, { state: { city } });
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setCityName(searchTerm);
      setTriggerSearch(true);
    } else {
      alert("Please Enter a City Name to Search!");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div>
      <header className="mb-8 text-center">
        <div className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Enter city name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
      </header>

     {/* Display user location city first */}
{userCity && (
  <div
    onClick={() => handleCityClick(userCity)}
    className="mb-6 cursor-pointer transform hover:scale-105 transition duration-300"
  >
    <div className= "backdrop-blur-md rounded-2xl p-4  flex-col items-center gap-2 shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto">
      <span className="text-sm font-semibold text-yellow-800">
        📍 Your Location
      </span>
      <CityCard city={userCity} />
    </div>
  </div>
)}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Display searched city */}
        {searchedCity && (
          <div onClick={() => handleCityClick(searchedCity)}>
            <CityCard city={searchedCity} />
          </div>
        )}

        {/* Display default cities */}
        {cities.map((city) => (
          <div key={city.name} onClick={() => handleCityClick(city)}>
            <CityCard city={city} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
