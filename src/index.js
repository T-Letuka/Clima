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
