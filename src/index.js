function formatDate(timestamp) {
    let data = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    let temperatureDisplay = document.querySelector(".display-temperature")
    let cityDisplay = document.querySelector(".display-city")
    let weatherDescription = document.querySelector(".weather-description")
    let humidityInfo = document.querySelector(".humidity")
    let windInfo = document.querySelector(".wind")
    let dateInfo = document.querySelector(".day-time")
    temperatureDisplay.innerHTML = Math.round(response.data.main.temp);
    cityDisplay.innerHTML = response.data.name
    weatherDescription.innerHTML = response.data.weather[0].description;
    humidityInfo.innerHTML = response.data.main.humidity;
    windInfo.innerHTML = Math.round(response.data.main.wind.speed);
    dateInfo.innerHTML = formatDate(response.data.dt * 1000);
}






let apiKey = "51c2d0279e8058f0ab3458acaad89de5";
let apiUrl = `https://api.openweathermap.org /data/2.5/ weather?lat={lat}&lon={lon}&appid=${apiKey}&units=imperial`;



