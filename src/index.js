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

// Adding leading zeros to single-digit hours and minutes
hour = hour < 10 ? "0" + hour : hour;
minutes = minutes < 10 ? "0" + minutes : minutes;

const actualTime = `${hour}:${minutes}`;

// Update HTML element with current day and time
const currentDay = document.getElementById("actual-day");
currentDay.innerHTML = `${actualDay} ${actualTime}`;

// Search form and temperature
const form = document.getElementById("search-form");

function findCity(city) {
  let apiKey = "06e466583a141dtb4eba022fc8fboc4e";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(currentWeather);
}

function submitButton(event) {
  event.preventDefault();
  let cityInput = document.getElementById("input-search");
  findCity(cityInput.value);
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
  getForecast(response.data.city);
}

function getForecast(city) {
  let apiKey = "06e466583a141dtb4eba022fc8fboc4e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5)
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div >
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong class="Forecasttwo">${Math.round(
              day.temperature.minimum
            )}°</strong>
          </div> 
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.maximum
          )}°</div>
        </div>
      </div>
    `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

// Add submit event listener to the form
form.addEventListener("submit", submitButton);

// API key
let apiKey = "06e466583a141dtb4eba022fc8fboc4e";
