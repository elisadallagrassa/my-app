let now = new Date();
let todayDay = document.querySelector("#date");
let todayTime = document.querySelector("#time");
let currentDate = now.getDate();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];

todayDay.innerHTML = `${currentDay} ${currentDate} ${currentMonth}`;
todayTime.innerHTML = `${currentHour}:${currentMinutes}`;

function showWeather(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector(".celsiusTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(cityName) {
  let apiKey = "51758ac4928a75db534673c6f5684b1c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function enterCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-city").value;
  search(cityName);
}

function searchLocation(position) {
  let apiKey = "51758ac4928a75db534673c6f5684b1c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("form");
form.addEventListener("submit", enterCity);

let currentLocation = document.querySelector("#map-icon");
currentLocation.addEventListener("click", getCurrentLocation);

search("New York");
