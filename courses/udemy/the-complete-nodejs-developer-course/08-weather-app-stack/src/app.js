/*
 * Wheater App
 * Weather Service: https://weatherstack.com
 * Geocode Service: https://www.mapbox.com
 * Last Update: 16/05/2021
 */

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define the app
const app = express();

// Define port
const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

// Use Handlebars template engine
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);

// Register partials folder
hbs.registerPartials(partialsDirectory);

// Setup static directory to serve
app.use(express.static(publicDirectory));

// Homepage -> http://localhost:PORT/
app.get('', (req, res) => {
  res.render('index', {});
});

// Weather -> http://localhost:PORT/weather
app.get('/weather', (req, res) => {
  res.render('weather', {});
});

// Weather -> http://localhost:PORT/weather
app.get('/weatherApi', (req, res) => {
  const targetCity = req.query.address;

  // Return an error message if address isn't provided
  if (!targetCity) return res.send({ error: 'You must provide an address' });
  geocode(targetCity, (err, city) => {
    if (err) {
      return res.send({ error: err });
    } else {
      forecast(city.coordinates, (err, forecastData) => {
        if (err) return res.send({ error: err });
        else {
          console.log(forecastData);
          return res.send({
            location: city.location,
            forecast: forecastData,
          });
        }
      });
    }
  });
});

// Need to be at the end of all the routes
// 404 -> http://localhost:PORT/*
app.get('*', (req, res) => {
  res.render('error', {});
});

// Start Express Server on specify
app.listen(PORT, () => {
  console.log(`Starting server at port ${PORT}`);
});
