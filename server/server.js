const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from client directory
app.use(express.static(path.join(__dirname, '../client')));

// Gemini API endpoint
app.post('/api/outfit', async (req, res) => {
  const { temp, humidity, weather, city } = req.body;

  if (!temp || !weather || !city) {
    return res.status(400).json({ error: 'Missing required weather data' });
  }

  const prompt = `Based on the current weather in ${city}: ${temp}°F, ${humidity}% humidity, and ${weather} conditions, suggest a brief unisex outfit recommendation. Keep it to 2-3 sentences max and make it practical and stylish.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API Error:', response.status, errorData);
      throw new Error(`Gemini API request failed: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const recommendation = data.candidates[0].content.parts[0].text;

    res.json({ recommendation });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to get outfit recommendation' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Open this URL in your browser to use the weather app');
});
