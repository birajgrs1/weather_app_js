document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "86359920db7aae223fd5724252e03895";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    try {
        searchBtn.addEventListener("click", async () => {
            const city = searchBox.value.trim();
            if (city === "") {
                alert("Please enter a city name.");
                return;
            }

            const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
            if (!response.ok) {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                return;
            }

            const data = await response.json();

            // Update DOM with weather information
            document.querySelector('.city').textContent = data.name;
            document.querySelector('.temp').textContent = Math.round(data.main.temp) + "°C";
            document.querySelector('.humidity').textContent = data.main.humidity + "%";
            document.querySelector('.wind').textContent = data.wind.speed + " km/h";

            // Update weather icon based on weather condition
            const weatherCondition = data.weather[0].main.toLowerCase();
            let iconSrc = "/img/";

            switch (weatherCondition) {
                case "clouds":
                    iconSrc += "clouds.png";
                    break;
                case "clear":
                    iconSrc += "clear.png";
                    break;
                case "rain":
                    iconSrc += "rain.png";
                    break;
                case "drizzle":
                    iconSrc += "drizzle.png";
                    break;
                case "mist":
                    iconSrc += "mist.png";
                    break;
                default:
                    iconSrc = "";
            }

            weatherIcon.src = iconSrc;

            document.querySelector(".error").style.display = "none";
            document.querySelector(".weather").style.display = "block";
        });
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
});
