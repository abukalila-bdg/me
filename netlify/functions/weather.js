const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { lat, lon } = event.queryStringParameters;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!lat || !lon) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing latitude or longitude' }),
    };
  }

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error: Missing API Key' }),
    };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `OpenWeatherMap API Error: ${response.statusText}` }),
      };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data' }),
    };
  }
};
