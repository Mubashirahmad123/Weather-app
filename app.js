document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("location");
    const getWeatherButton = document.getElementById("get-weather");
    const locationName = document.getElementById("location-name");
    const unitToggle = document.getElementById("unit-toggle");
    const weatherData = document.getElementById("weather-data");

    getWeatherButton.addEventListener("click", function () {
        const location = locationInput.value;
        const unit = unitToggle.value;
        const apiKey = "94b2580023024aae1c501204efd6f70c" ;

        // Build the API URL
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

        // Make an AJAX request to the API
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === 200) {
                    locationName.textContent = data.name;
                    const temperature = data.main.temp;
                    const humidity = data.main.humidity;
                    const windSpeed = data.wind.speed;
                    const weatherDescription = data.weather[0].description;

                    weatherData.innerHTML = `
                        <p>Temperature: ${temperature}°${unit === 'metric' ? 'C' : 'F'}</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                        <p>Description: ${weatherDescription}</p>
                        
                    `;
                } else {
                    // Handle error cases
                    weatherData.textContent = "Location not found. Please try another.";
                }
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                weatherData.textContent = "An error occurred while fetching data. Please try again later.";
            });
    });
});
