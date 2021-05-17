/*
 * Wheater App
 * Weather Service: https://weatherstack.com
 * Geocode Service: https://www.mapbox.com
 * Last Update: 16/05/2021
 */

const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Define the app
const app = express();

// Define port
const PORT = 3000;

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

// Need to be at the end of all the routes
// 404 -> http://localhost:PORT/*
app.get('*', (req, res) => {
  res.render('error', {});
});

// Start Express Server on specify
app.listen(PORT, () => {
  console.log(`Starting server at port ${PORT}`);
});
