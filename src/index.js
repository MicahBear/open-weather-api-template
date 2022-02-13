function timeDisplay(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForcast(response) {
    let daily = response.data.daily;
    let weatherCast = document.querySelector("#weather-cast");

    let castHTML = `<div class="row">`;

    daily.forEach(function (forecastDay, index) {
        if (index < 6) {

            castHTML = castHTML + `
                   <div class="col-md-2 g-2 day-display">
              <p id="monday">${formatDay(forecastDay.dt)}</p>
              <img
               src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon
                }@2x.png" 
                alt="" 
                />
              <span class="temp-max">
              ${Math.round(
                    forecastDay.temp.max
                )}°
                </span>
              <span class="temp-min">
              ${Math.round(
                    forecastDay.temp.min
                )}°
                </span>
            </div>
                `;
        }
    })




    castHTML = castHTML + `</div>`;
    weatherCast.innerHTML = castHTML;

}
function getForcast(coordinates) {
    console.log(coordinates);
    let apiKey = "51c2d0279e8058f0ab3458acaad89de5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForcast)
}

function displayTemp(response) {
    let tempDisplay = document.querySelector(".main-temp");
    let cityDisplay = document.querySelector("#displayCity");
    let weatherDescription = document.querySelector(".weather-description")
    let humidityInfo = document.querySelector(".humidity");
    let windInfo = document.querySelector(".wind");
    let dateInfo = document.querySelector("#timedisplay");
    let iconElement = document.querySelector("#icon");
    fahrenheitInfo = response.data.main.temp;



    tempDisplay.innerHTML = Math.round(fahrenheitInfo);
    cityDisplay.innerHTML = response.data.name;
    weatherDescription.innerHTML = response.data.weather[0].description;
    humidityInfo.innerHTML = response.data.main.humidity;
    windInfo.innerHTML = Math.round(response.data.wind.speed);
    dateInfo.innerHTML = timeDisplay(response.data.dt * 1000);
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    getForcast(response.data.coord);

}

function search(city) {
    let apiKey = "51c2d0279e8058f0ab3458acaad89de5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
    event.preventDefault();
    let searchValue = document.querySelector("#search-input");
    search(searchValue.value);
}

function celsiusFormula(event) {
    event.preventDefault();

    let celsiusConversion = (fahrenheitInfo - 32) * 5 / 9
    let tempDisplay = document.querySelector(".main-temp")
    tempDisplay.innerHTML = Math.round(celsiusConversion);
}
function fahrenheitFormula(event) {
    event.preventDefault();
    let tempDisplay = document.querySelector(".main-temp")
    tempDisplay.innerHTML = Math.round(fahrenheitInfo);

}

let fahrenheitInfo = null;

let form = document.querySelector(".search");
form.addEventListener("submit", handleSubmit);

let celsiusHandle = document.querySelector(".celsius");
celsiusHandle.addEventListener("click", celsiusFormula)

let fahrenheitHandle = document.querySelector(".fahrenheit");
fahrenheitHandle.addEventListener("click", fahrenheitFormula)

search("San Francisco");