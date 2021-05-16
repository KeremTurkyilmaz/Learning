/*
 * Wheater App
 * Weather Service: https://weatherstack.com
 * Geocode Service: https://www.mapbox.com
 * Docs. https://weatherstack.com/documentation
 * Last Update: 15/05/2021
 */

/*
 * Setup env variables
 * https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
 */

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Get user city input, otherwise provide a fallback city
const targetCity = process.argv[2] ? process.argv[2] : 'Bellinzona';

geocode(targetCity, (err, city) => {
  if (err) {
    return console.log(err);
  } else {
    console.log('Getting forecast for ' + city.location);
    forecast(city.coordinates, (err, forecastData) => {
      if (err) return console.log(err);
      else {
        console.log(forecastData);
      }
    });
  }
});
