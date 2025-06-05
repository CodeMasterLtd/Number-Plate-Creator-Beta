const apiKey = '86e4563e8fd1dca3cafae89072ab8715';

function getWeather(lat, lon) {
    const unit = getUserTempUnit();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const roundedTemp = Math.round(temp);
            const location = data.name;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            // Get sunrise and sunset times (in seconds, UTC)
            const sunriseUTC = data.sys.sunrise * 1000;
            const sunsetUTC = data.sys.sunset * 1000;
            const now = new Date();

            // Convert sunrise/sunset to local time
            const sunriseDate = new Date(sunriseUTC);
            const sunsetDate = new Date(sunsetUTC);

            const sunMoonEmoji = iconCode.endsWith('d') ? '☀️' : '🌙';

            const weatherElement = document.getElementById('weather');
            const tempUnitSymbol = unit === 'imperial' ? '°F' : '°C';

            // Create emoji span with live-updating hover tooltip
            const emojiSpan = document.createElement('span');
            emojiSpan.textContent = sunMoonEmoji;
            emojiSpan.style.cursor = "pointer";

            let tooltipInterval = null;

            emojiSpan.addEventListener('mouseenter', function (e) {
                let tooltip = document.createElement('div');
                tooltip.id = "emoji-tooltip";
                tooltip.style.position = "fixed";
                tooltip.style.background = "#222";
                tooltip.style.color = "#fff";
                tooltip.style.padding = "6px 12px";
                tooltip.style.borderRadius = "6px";
                tooltip.style.fontSize = "1em";
                tooltip.style.zIndex = 9999;
                tooltip.style.pointerEvents = "none";
                document.body.appendChild(tooltip);

                function updateTooltip(ev) {
                    const currentTime = GetTime();
                    tooltip.innerHTML = `Current time: <b>${currentTime}</b><br>🌅 Sunrise: <b>${sunriseDate.getHours().toString().padStart(2, '0')}:${sunriseDate.getMinutes().toString().padStart(2, '0')}</b> &nbsp; 🌇 Sunset: <b>${sunsetDate.getHours().toString().padStart(2, '0')}:${sunsetDate.getMinutes().toString().padStart(2, '0')}</b>`;
                    if (ev) {
                        tooltip.style.left = (ev.clientX + 12) + "px";
                        tooltip.style.top = (ev.clientY + 12) + "px";
                    }
                }

                updateTooltip(e);

                document.addEventListener('mousemove', updateTooltip);

                tooltipInterval = setInterval(() => updateTooltip(), 1000);

                emojiSpan.addEventListener('mouseleave', function removeTooltip() {
                    tooltip.remove();
                    document.removeEventListener('mousemove', updateTooltip);
                    clearInterval(tooltipInterval);
                    emojiSpan.removeEventListener('mouseleave', removeTooltip);
                });
            });

            const tempText = ` Current temperature in |${location}| is: `;

            // Create the temperature value and icon image
            const tempValueElement = document.createElement('span');
            tempValueElement.innerText = `${roundedTemp}${tempUnitSymbol} `;

            const iconImg = document.createElement('img');
            iconImg.src = iconUrl;
            iconImg.alt = "Weather Icon";
            iconImg.style.verticalAlign = "middle";
            iconImg.style.width = "32px";
            iconImg.style.height = "32px";

            tempValueElement.appendChild(iconImg);
            tempValueElement.style.fontWeight = 'bold';

            weatherElement.innerHTML = "";
            weatherElement.appendChild(emojiSpan);
            weatherElement.append(tempText);
            weatherElement.appendChild(tempValueElement);

            if (unit === 'metric') {
                if (roundedTemp <= 10) {
                    tempValueElement.style.color = '#add8e6';
                } else if (roundedTemp > 10 && roundedTemp <= 25) {
                    tempValueElement.style.color = '#ffcc00';
                } else {
                    tempValueElement.style.color = '#ff5733';
                }
            } else {
                if (roundedTemp <= 50) {
                    tempValueElement.style.color = '#add8e6';
                } else if (roundedTemp > 50 && roundedTemp <= 77) {
                    tempValueElement.style.color = '#ffcc00';
                } else {
                    tempValueElement.style.color = '#ff5733';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            document.getElementById('weather').innerText = 'Unable to retrieve weather.';
        });
}

function getLocationByIP() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const lat = data.latitude;
            const lon = data.longitude;

            if (lat && lon) {
                getWeather(lat, lon);

                setInterval(() => {
                    getWeather(lat, lon);
                }, 300000);
            } else {
                getCityCoordinates(data.country_capital);
            }
        })
        .catch(error => {
            console.error('IP geolocation failed:', error);

            getWeather(51.5074, -0.1278);
        });
}

function getCityCoordinates(cityName) {
    const apiKey = '86e4563e8fd1dca3cafae89072ab8715';
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                getWeather(lat, lon);
            } else {
                getWeather(51.5074, -0.1278);
            }
        })
        .catch(err => {
            console.error('Capital city lookup failed:', err);
            getWeather(51.5074, -0.1278);
        });
}

function getUserTempUnit() {
    const locale = navigator.language || navigator.userLanguage || 'en-GB';
    const fahrenheitLocales = ['en-US', 'en-BS', 'en-BZ', 'en-KY', 'en-PW', 'en-LR'];
    if (fahrenheitLocales.some(l => locale.startsWith(l))) {
        return 'imperial'; // Fahrenheit
    }
    return 'metric'; // Celsius
}

function GetTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const tz = now.toLocaleTimeString(navigator.language || navigator.userLanguage || 'en-GB', { timeZoneName: 'short' }).split(' ').pop();
    const currentTime = `${hours}:${minutes}:${seconds} (${tz})`;
    return currentTime;
}

getLocationByIP();