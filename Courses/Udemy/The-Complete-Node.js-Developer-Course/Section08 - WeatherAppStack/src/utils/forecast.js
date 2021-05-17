const dotenv = require('dotenv').config();
const request = require('postman-request');

// Weather API settings
const weatherApi = 'http://api.weatherstack.com/current';
const weatherstack_token = process.env.WEATHERSTACK_TOKEN || ''; // YOUR API TOKEN from Weather Stack

/**
 * Get the current forecast by giving specific set of coordinates
 * @param {Object} coordinates An object with lat and long coordinates
 * @param {number} coordinates.lat - Latitude
 * @param {number} coordinates.long - Longitude
 * @param {requestCallback} callback - The callback that handles the response.
 */
const forecast = (coordinates, callback) => {
  // Store location into a variable
  const location = `${coordinates.lat},${coordinates.long}`;

  // Build the endpoint with all the information
  const weatherEndpoint = `${weatherApi}?access_key=${weatherstack_token}&query=${location}`;

  // Make the api call
  request({ url: weatherEndpoint, json: true }, (err, res) => {
    // Service Error
    if (err) {
      return callback('Unable to connect to weather service!');
      // Weather API Error
    } else if (res.body.error) {
      return callback(`Code: ${res.body.error.code}, ${res.body.error.info}`);
      // Get Forecast data
    } else {
      const { temperature, feelslike } = res.body.current;
      return callback(
        null,
        `It's currently ${temperature} degrees out. It feels like ${feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
