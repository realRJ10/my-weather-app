function date() {
  let timeHeading = document.querySelector("#time");

  let minute = new Date().getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  let hour = new Date().getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let day = new Date().getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  timeHeading.innerHTML = `${days[day]} ${hour}:${minute}`;
}
date();

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let forecastHTML = ` <div class="row">`;
  let days = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col">
         <h4>
          <div>${day}</div>
          <img src="https://openweathermap.org/img/wn/04d@2x.png" width="40px" />
          <div>18° 12°</div>
         </h4>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showTemp(response) {
  let temprature = document.querySelector("#temp");
  temprature.innerHTML = Math.round(response.data.main.temp);
  let head = document.querySelector("h1");
  head.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity} %`;
  let feelLike = document.querySelector("#feel");
  feelLike.innerHTML = `${Math.round(response.data.main.feels_like)} °C`;
  let wind = document.querySelector("#speed");
  wind.innerHTML = `${response.data.wind.speed} m/s`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  celsius = response.data.main.temp;
  celsiusFeel = response.data.main.feels_like;
  displayForecast();
}

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#input");
  let city = input.value;
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(showTemp, changeTempToF);
}

function showCurrentTemp(response) {
  let temprature = document.querySelector("#temp");
  temprature.innerHTML = Math.round(response.data.main.temp);
  let head = document.querySelector("h1");
  head.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity} %`;
  let feelLike = document.querySelector("#feel");
  feelLike.innerHTML = `${Math.round(response.data.main.feels_like)} °C`;
  let wind = document.querySelector("#speed");
  wind.innerHTML = `${response.data.wind.speed} m/s`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  celsius = response.data.main.temp;
  celsiusFeel = response.data.main.feels_like;
  displayForecast();
}

function currentTemp(position) {
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(currentWeatherUrl).then(showCurrentTemp, changeTempToF);
}

function getLocBottun(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentTemp);
}

function changeTempToF(event) {
  event.preventDefault();
  let temprature = document.querySelector("#temp");
  temprature.innerHTML = Math.round((celsius * 9) / 5 + 32);
  let feelLike = document.querySelector("#feel");
  feelLike.innerHTML = `${Math.round((celsiusFeel * 9) / 5 + 32)} °F`;
}

function changeTempToC(event) {
  event.preventDefault();
  let temprature = document.querySelector("#temp");
  temprature.innerHTML = Math.round(celsius);
  let feelLike = document.querySelector("#feel");
  feelLike.innerHTML = `${Math.round(celsiusFeel)} °C`;
}

let celsius = null;
let celsiusFeel = null;

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getLocBottun);

let button = document.querySelector("#button");
button.addEventListener("click", changeCity);

let changeToF = document.querySelector("#toF");
changeToF.addEventListener("click", changeTempToF);

let changeToC = document.querySelector("#toC");
changeToC.addEventListener("click", changeTempToC);

navigator.geolocation.getCurrentPosition(currentTemp);
showCurrentTemp();
