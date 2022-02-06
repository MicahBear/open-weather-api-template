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

function displayTemp(response) {
    let tempDisplay = document.querySelector(".main-temp");
    let cityDisplay = document.querySelector("#displayCity");
    let weatherDescription = document.querySelector(".weather-description")
    let humidityInfo = document.querySelector(".humidity");
    let windInfo = document.querySelector(".wind");
    let dateInfo = document.querySelector("#timedisplay");
    let iconElement = document.querySelector("#icon");
    tempDisplay.innerHTML = Math.round(response.data.main.temp);
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

search("medford");
let form = document.querySelector(".search");
form.addEventListener("submit", handleSubmit);