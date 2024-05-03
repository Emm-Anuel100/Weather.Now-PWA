"use strict";

document.getElementById('weatherForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  var city = document.getElementById('input-box').value.trim();
  fetchWeather(city);
});

function fetchWeather(city) {
  var apiKey = '19fd70b18eca99d4396ea521c3ba18f9';
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&APPID=").concat(apiKey, "&units=metric");
  fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    displayWeather(data); // Display current time after fetching weather data

    displayCurrentTime(data.coord.lat, data.coord.lon);
  })["catch"](function (error) {
    console.error('Error fetching weather data:' + error);
    document.getElementById('weatherReport').innerText = 'Error fetching weather data:' + error;
  });
}

function displayWeather(data) {
  var cityName = data.name;
  var country = data.sys.country;
  var temperature = Math.round(data.main.temp);
  var weatherDescription = data.weather[0].description;
  var pressure = data.main.pressure;
  var windSpeed = data.wind.speed;
  var cloudiness = data.clouds.all;
  var sunriseTimestamp = data.sys.sunrise * 1000; // Convert seconds to milliseconds

  var sunrise = new Date(sunriseTimestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  var sunsetTimestamp = data.sys.sunset * 1000; // Convert seconds to milliseconds

  var sunset = new Date(sunsetTimestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  var humidity = data.main.humidity;
  var visibility = data.visibility / 1000; // Convert meters to kilometers

  var feelsLike = Math.round(data.main.feels_like);
  document.getElementById('cityCountry').textContent = "".concat(cityName, ", ").concat(country);
  document.getElementById('temperature').textContent = "".concat(temperature, "\xB0C");
  document.getElementById('weatherDescription').textContent = weatherDescription;
  document.getElementById('pressure').textContent = "".concat(pressure, " hPa");
  document.getElementById('windSpeed').textContent = "".concat(windSpeed, " m/s");
  document.getElementById('cloudiness').textContent = "".concat(cloudiness, "%");
  document.getElementById('sunrise').textContent = sunrise;
  document.getElementById('sunset').textContent = sunset;
  document.getElementById('humidity').textContent = "".concat(humidity, "%");
  document.getElementById('visibility').textContent = "".concat(visibility, " km");
  document.getElementById('feelsLike').textContent = "".concat(feelsLike, "\xB0C");
} // function to fetch the curent time 


function displayCurrentTime(latitude, longitude) {
  var currentTimeElement = document.getElementById('currentTime');
  var apiUrl = "https://api.timezonedb.com/v2.1/get-time-zone?key=Z14LUA35K86X&format=json&by=position&lat=".concat(latitude, "&lng=").concat(longitude);
  fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    var currentTime = new Date(data.formatted);
    var formattedTime = currentTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    currentTimeElement.textContent = formattedTime;
  })["catch"](function (error) {
    console.error('Error fetching current time data:' + error);
    currentTimeElement.textContent = 'Error fetching current time';
  });
}