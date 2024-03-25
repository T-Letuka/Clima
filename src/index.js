//for the actual day
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDate = new Date();

let actualDayIndex = currentDate.getDay();
let actualDay = days[actualDayIndex];

let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();

hour = hour < 10 ? "0" + hour : hour;
minutes = minutes < 10 ? "0" + minutes : minutes;

let actaulTime = `${hour}:${minutes}`;

let currentDay = document.getElementById("actual-day");
currentDay.innerHTML = `${actualDay} ${actaulTime}`;

//SEARCH FORM AND TEMPERATURE
let form = document.getElementById("search-form");
function submitButton(event) {
  event.preventDefault();

  let cityInput = document.getElementById("input-search").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}`;

  axios.get(apiUrl).then(currentWeather);
}

function currentWeather(response) {
  console.log(response.data);
  let newCity = document.querySelector("#new-city");
  let newTemperature = document.querySelector("#new-temperature");
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);

  newCity.innerHTML = city;
  newTemperature.innerHTML = `${temperature}`;
}
form.addEventListener("submit", function (event) {
  submitButton(event);
});

let apiKey = "06e466583a141dtb4eba022fc8fboc4e";
let city = "Paris";
