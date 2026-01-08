const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';

// Server endpoint for Gemini API (keeps API key safe on server)
const outfitApiUrl = 'http://localhost:3000/api/outfit';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

// async marks the function as async, runs in the background
// await pauses the function and waits for a Promise 
async function checkWeather(cityName) {
  const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
  responseStatusChecker(response);
}

async function responseStatusChecker(response) {
  if (response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else { 
    let data = await response.json();

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°F';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + ' mph';

    updateWeatherIcon(data, weatherIcon);
    document.querySelector('.weather').style.display = 'block';

    document.querySelector('.error').style.display = 'none';
    document.querySelector('.weather').style.display = 'block';

    // Get outfit recommendation from Gemini
    getOutfitRecommendation(data);
  }
}

function updateWeatherIcon(data, weatherIcon) {
  if (data.weather[0].main == 'Clouds') {
    weatherIcon.src = "images/clouds.png";
  }
  else if (data.weather[0].main == 'Clear') {
    weatherIcon.src = "images/clear.png";
  }
  else if (data.weather[0].main == 'Rain') {
    weatherIcon.src = "images/rain.png";
  }
  else if (data.weather[0].main == 'Drizzle') {
    weatherIcon.src = "images/drizzle.png";
  }
  else if (data.weather[0].main == 'Mist') {
    weatherIcon.src = "images/mist.png";
  }
}

// Gemini API call for outfit recommendation (via secure server)
async function getOutfitRecommendation(weatherData) {
  const temp = Math.round(weatherData.main.temp);
  const humidity = weatherData.main.humidity;
  const weather = weatherData.weather[0].main;
  const city = weatherData.name;

  try {
    const response = await fetch(outfitApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ temp, humidity, weather, city })
    });

    if (!response.ok) {
      throw new Error('Server request failed');
    }

    const data = await response.json();
    alert(`👕 Outfit Recommendation for ${city}:\n\n${data.recommendation}`);
  } catch (error) {
    console.error('Error getting outfit recommendation:', error);
    alert('Could not get outfit recommendation. Make sure the server is running.');
  }
}

// arrow func
searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});
 // keyup event listener 
searchBox.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    checkWeather(searchBox.value);
  }
});


