const apiKey = "a94b2cee4ae3610e41d1b22cfc6aa5d6"; // Replace with your OpenWeather API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");

// Event Listeners
searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
});

// Fetch weather data
function getWeather() {
    const city = cityInput.value.trim();
    if (city === "") {
        cityInput.style.borderColor = "rgba(255, 107, 107, 0.8)";
        setTimeout(() => {
            cityInput.style.borderColor = "rgba(255, 255, 255, 0.3)";
        }, 2000);
        return;
    }

    // Show loading state
    searchBtn.innerHTML = "🔍";
    searchBtn.classList.add("loading");
    searchBtn.disabled = true;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `${Math.round(data.main.temp)}°`;
            condition.textContent = data.weather[0].description;
            feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
            humidity.textContent = `${data.main.humidity}%`;
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            weatherResult.classList.remove("hidden");

            // Update background based on weather
            updateBackground(data.weather[0].main.toLowerCase());
        })
        .catch(error => {
            alert("🚫 " + error.message + ". Please try again!");
        })
        .finally(() => {
            // Reset button state
            searchBtn.innerHTML = "Search";
            searchBtn.classList.remove("loading");
            searchBtn.disabled = false;
            cityInput.value = "";
        });
}

// Update background based on weather condition
function updateBackground(weather) {
    const body = document.body;

    switch (weather) {
        case 'clear':
            body.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            break;
        case 'clouds':
            body.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            break;
        case 'rain':
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            break;
        case 'snow':
            body.style.background = 'linear-gradient(135deg, #e6ddd4 0%, #d5badb 100%)';
            break;
        case 'thunderstorm':
            body.style.background = 'linear-gradient(135deg, #2c1810 0%, #8360c3 100%)';
            break;
        default:
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

// Add some interactive particles
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat 4s linear infinite;
        left: ${Math.random() * 100}vw;
        animation-delay: ${Math.random() * 4}s;
      `;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 4000);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
      @keyframes particleFloat {
        0% { 
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { 
          transform: translateY(-10px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 300);