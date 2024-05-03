

document.getElementById('weatherForm').addEventListener('submit', function(event) {
   event.preventDefault(); // Prevent form submission
   const city = document.getElementById('input-box').value.trim();
   fetchWeather(city);
});

function fetchWeather(city) {
   const apiKey = '19fd70b18eca99d4396ea521c3ba18f9';
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

   fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
         displayWeather(data);
         // Display current time after fetching weather data
         displayCurrentTime(data.coord.lat, data.coord.lon); 
      })
      .catch(error => {
         console.error('Error fetching weather data:' + error);
         document.getElementById('weatherReport').innerText = 'Error fetching weather data:' + error;
      });
}

function displayWeather(data) {
   const cityName = data.name;
   const country = data.sys.country;
   const temperature = Math.round(data.main.temp);
   const weatherDescription = data.weather[0].description;
   const pressure = data.main.pressure;
   const windSpeed = data.wind.speed;
   const cloudiness = data.clouds.all;
   const sunriseTimestamp = data.sys.sunrise * 1000; // Convert seconds to milliseconds
   const sunrise = new Date(sunriseTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
   const sunsetTimestamp = data.sys.sunset * 1000; // Convert seconds to milliseconds
   const sunset = new Date(sunsetTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
   const humidity = data.main.humidity;
   const visibility = data.visibility / 1000; // Convert meters to kilometers
   const feelsLike = Math.round(data.main.feels_like);

   document.getElementById('cityCountry').textContent = `${cityName}, ${country}`;
   document.getElementById('temperature').textContent = `${temperature}°C`;
   document.getElementById('weatherDescription').textContent = weatherDescription;
   document.getElementById('pressure').textContent = `${pressure} hPa`;
   document.getElementById('windSpeed').textContent = `${windSpeed} m/s`;
   document.getElementById('cloudiness').textContent = `${cloudiness}%`;
   document.getElementById('sunrise').textContent = sunrise;
   document.getElementById('sunset').textContent = sunset;
   document.getElementById('humidity').textContent = `${humidity}%`;
   document.getElementById('visibility').textContent = `${visibility} km`;
   document.getElementById('feelsLike').textContent = `${feelsLike}°C`;
}


// function to fetch the curent time 
function displayCurrentTime(latitude, longitude) {
   const currentTimeElement = document.getElementById('currentTime');
   const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=Z14LUA35K86X&format=json&by=position&lat=${latitude}&lng=${longitude}`;

   fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
         const currentTime = new Date(data.formatted);
         const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         currentTimeElement.textContent = formattedTime;
      })
      .catch(error => {
         console.error('Error fetching current time data:' + error);
         currentTimeElement.textContent = 'Error fetching current time';
      });
}
