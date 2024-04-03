//for the actual day
// Days of the week array
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Get current date and time
const currentDate = new Date();
const actualDayIndex = currentDate.getDay();
const actualDay = days[actualDayIndex];

let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();

// Add leading zeros to single-digit hours and minutes
hour = hour < 10 ? "0" + hour : hour;
minutes = minutes < 10 ? "0" + minutes : minutes;

const actualTime = `${hour}:${minutes}`;

// Update HTML element with current day and time
const currentDay = document.getElementById("actual-day");
currentDay.innerHTML = `${actualDay} ${actualTime}`;

// Search form and temperature
const form = document.getElementById("search-form");

function submitButton(event) {
  event.preventDefault();

  const cityInput = document.getElementById("input-search").value;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}`;

  axios.get(apiUrl).then(currentWeather);
}

function currentWeather(response) {
  const newCity = document.querySelector("#new-city");
  const newTemperature = document.querySelector("#new-temperature");
  const city = response.data.city;
  const temperature = Math.round(response.data.temperature.current);
  const descriptionElement = document.querySelector("#description");
  const humidityElement = document.querySelector("#humidity");
  const windSpeedElement = document.querySelector("#windspeed");
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="weather-icon"/>`;

  newCity.innerHTML = city;
  newTemperature.innerHTML = `${temperature}`;
  const description = response.data.condition.description;
  descriptionElement.innerHTML = `,${description}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  console.log(response.data);
}

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri"];

  days.forEach(function (day) {
    forecast.innerHTML += `
      <div class="forecast-day">
        <div class="date-forecast">${day}</div>
        <div class="weather-icon">⛈</div>
        <div class="forecast-temperature">
          <span class="temperature-deg">12</span> 9
        </div>
      </div>
    `;
  });
}
displayForecast();
// Add submit event listener to the form
form.addEventListener("submit", submitButton);

// API key
let apiKey = "06e466583a141dtb4eba022fc8fboc4e";
