# 🌤️ Weather App with AI Outfit Recommendations

A modern weather application that displays real-time weather data and provides smart, AI-generated outfit suggestions based on the local weather conditions.

## ✨ Features

- **Real-time Weather**: Search by city to get current temperature (°F), humidity, wind speed, and weather conditions.
- **AI Outfit Advisor**: Powered by Google Gemini, get practical and stylish unisex outfit recommendations tailored to the weather.
- **Dynamic UI**: Beautiful weather icons and responsive card design.
- **Secure**: Backend proxy server protects API keys.

## � Get API Keys

- **OpenWeatherMap**: Sign up at [openweathermap.org](https://openweathermap.org/api) to get a free API key.
- **Google Gemini**: Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

## �🚀 Quick Start

1. **Install Dependencies**

   ```bash
   git clone <repository_url>
   cd weather-app/server
   npm install
   ```

2. **Configure API Keys**

   - Create a `.env` file in the `server` folder:
     ```env
     GEMINI_API_KEY=your_gemini_key
     ```
   - Add your OpenWeatherMap key to `client/app.js`.

3. **Run the App**
   ```bash
   node server.js
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express
- **AI Integration**: Google Gemini 1.5 Flash
- **Data Source**: OpenWeatherMap API
