let image = document.createElement("img");
image.classList.add("myicon");
// let imageSrc;
let imgCont = document.getElementById("img-container");
fetch("https://ipinfo.io/json?token=03a9e4b5033cb1")
  .then((response) => response.json())
  .then((jsonResponse) => {
    // let [lat, lon] = jsonResponse.loc.split(",");
    console.log(lat);
    console.log(lon);
    const myKey = "df79143cd12dec97f7be110d24c50ef2";
    return fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${myKey}`
    );
  })
  .then((response) => response.json())
  .then((weatherData) => {
    console.log(weatherData);
    let icon = weatherData.current.weather[0].icon;
    console.log(icon);
    return fetch(`https://openweathermap.org/img/wn/${icon}@2x.png`);
  })
  .then((finaldata) => {
    console.log(finaldata);
    image.src = finaldata.url;
    imgCont.appendChild(image);
    // console.log(data);
  })
  .catch((error) => console.error("Error:", error));

async function getWeatherByIp() {
  const locationResponse = await fetch(
    "https://ipinfo.io/json?token=03a9e4b5033cb1"
  );
  const location = await locationResponse.json();
  let [lat, lon] = jsonResponse.loc.split(",");
}
