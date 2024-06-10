let container = document.getElementById("container");
let place = document.createElement("div");
place.classList.add("place");

function getCurrentDateTime() {
  let now = new Date();
  let day = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let hours12 = hours % 12 || 12;
  let amPm = hours >= 12 ? "PM" : "AM";
  let minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
  let secondsFormatted = seconds < 10 ? "0" + seconds : seconds;
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let dayName = daysOfWeek[day];
  return `${dayName} ${hours12}:${minutesFormatted} ${amPm}`;
}

async function getWeatherByIp() {
  try {
    // Fetching location from ipinfo.io
    const locationResponse = await fetch(
      "https://ipinfo.io/json?token=03a9e4b5033cb1"
    );
    const location = await locationResponse.json();

    let locationName = document.createElement("h2");
    let locationTime = document.createElement("p");
    locationTime.classList.add("time");
    locationName.classList.add("location");

    let [lat, lon] = location.loc.split(",");

    //   fetching weather data using the location cordinates(latitude & longitude)
    const weatherKey = "df79143cd12dec97f7be110d24c50ef2";
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`
    );
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    const weatherIconCode = weatherData.current.weather[0].icon;
    const temp = weatherData.current.temp;
    console.log(temp);

    // fetching the weather icon
    let weatherIcon = await fetch(
      `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`
    );
    locationName.textContent = location.region;
    locationTime.textContent = getCurrentDateTime();
    place.appendChild(locationName);
    place.appendChild(locationTime);
    container.appendChild(place);
    let imgCont = document.createElement("div");
    imgCont.classList.add("img-container");
    let image = document.createElement("img");
    image.classList.add("myicon");
    image.src = weatherIcon.url;
    imgCont.appendChild(image);
    container.appendChild(imgCont);
    let tempCont = document.createElement("h2");
    tempCont.classList.add("temp");
    tempCont.textContent = `${temp}°c`;
    container.appendChild(tempCont);
  } catch {
    console.log(`There is an error`);
  }
}
getWeatherByIp();
