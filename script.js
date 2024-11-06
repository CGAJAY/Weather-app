const apiKey = "e920e479f7be7a8a2544121b5e6b7d0e";

// Function to fetch weather data by city name
async function fetchWeather(city) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
		);

		// Check if the response is successful
		if (!response.ok) {
			throw new Error("City not found");
		}

		const data = await response.json();
		displayWeather(data);
	} catch (error) {
		console.error("Error fetching weather data:", error);
		alert(error.message);
	}
}

// Function to display weather data
function displayWeather(data) {
	const weatherContainer = document.getElementById(
		"weather-container"
	);
	weatherContainer.innerHTML = ""; // Clear previous data

	const city = data.name;
	const temperature = data.main.temp; // Temperature in Celsius
	const description = data.weather[0].description; // Weather description

	// Create a new element for the weather data
	const weatherElement = document.createElement("div");
	weatherElement.className = "weather-card";
	weatherElement.innerHTML = `
        <h2>${city}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${description}</p>
    `;
	weatherContainer.appendChild(weatherElement);
}

// Event listener for the submit button
document
	.getElementById("fetch-weather")
	.addEventListener("click", () => {
		const city =
			document.getElementById("city-input").value; // Get city name from input

		if (city) {
			fetchWeather(city);
		} else {
			alert("Please enter a city name.");
		}
	});
