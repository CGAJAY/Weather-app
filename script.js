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
