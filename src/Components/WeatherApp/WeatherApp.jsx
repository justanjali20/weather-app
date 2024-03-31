import React, { useState } from 'react';
import './WeatherApp.css'
import search from '../Assests/search.png'
import clear from '../Assests/clear.png'
import drizzle from '../Assests/drizzle.png'
import humidity from '../Assests/humidity.png'
import rain from '../Assests/rain.png'
import snow from '../Assests/snow.png'
import wind from '../Assests/wind.png'
import cloud from '../Assests/cloud.png'



const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    wind: '',
    temperature: '',
    location: ''
  });
  const apiKey = "be70a538a0d5e5ea99548ba5ba548faa";
  const [wicon, setWicon] = useState(cloud);

  const searchWeather = async () => {
    const cityInput = document.querySelector(".cityInput").value;
    if (!cityInput) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
    
      setWeatherData({
        humidity: data.main.humidity, 
        wind: Math.floor(data.wind.speed),
        temperature: Math.floor(data.main.temp),
        location: data.name
      });
    
      // Move the code that references 'data' inside this block
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear);
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud);
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n" || data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(drizzle);
      } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n" || data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setWicon(rain);
      } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setWicon(snow);
      } else {
        setWicon(clear);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={searchWeather}>
        <img className="search-img" src={search} alt="" />
        </div>
      </div>
      <div className="weather-image">
  <img className='cloud'  src={wicon} alt="" />
</div>
<div className="weather-temp">{weatherData.temperature}°C</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
        <img src={humidity} alt="" className="icon" />
        <div className="data">
          <div className="humidity-percentage">{weatherData.humidity}%</div>
         <div className="text">Humidity</div>
        </div>
        </div>
        <div className="element">
        <img src={wind} alt="" className="icon" />
        <div className="data">
          <div className="wind-rate">{weatherData.wind} km/h</div>
          <div className="text">Wind speed</div> 
        </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
