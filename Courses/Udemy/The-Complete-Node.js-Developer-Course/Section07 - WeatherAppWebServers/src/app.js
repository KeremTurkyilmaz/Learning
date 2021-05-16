const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Define the app
const app = express();

// Define port
const PORT = 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Use Handlebars template engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Register partials folder
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

// Homepage -> http://localhost:PORT/
app.get('', (req, res) => {
  res.render('index', {});
});

// About -> http://localhost:PORT/about
app.get('/about', (req, res) => {
  res.render('about', {});
});

// Need to be at the end of all routes
// 404 -> http://localhost:PORT/*
app.get('*', (req, res) => {
  res.render('error', {});
});

// Start Express Server
app.listen(PORT, () => {
  console.log('Starting server at port 3000');
});
