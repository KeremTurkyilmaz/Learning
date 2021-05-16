const request = require('postman-request');
const dotenv = require('dotenv').config();

const mapboxApi = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const mapbox_token = process.env.MAP_BOX_TOKEN || ''; // YOUR API TOKEN from Mapbox

/**
 * Get the coordinates of a city by specifying the name
 * @param {string} address - City name
 * @param {requestCallback} callback - The callback that handles the response.
 */
const geocode = (address, callback) => {
  // Return if the address is not provided
  if (!address) return callback('No Address Provided');

  // Check special characters
  const encodedAddress = encodeURIComponent(address);

  // Build the endpoint with all the information
  const mapboxEndpoint = `${mapboxApi}/${encodedAddress}.json?access_token=${mapbox_token}&limit=1`;

  // Make the api call
  request({ url: mapboxEndpoint, json: true }, (err, res) => {
    if (err) {
      return callback('Unable to connect to Mapbox service!');
    } else if (res.body.message) {
      return callback('Mapbox error: ' + res.body.message);
    } else if (res.body.features.length === 0) {
      return callback('Client error: City not found, try another search');
    } else {
      const featured = res.body.features[0];
      const [long, lat] = featured.center;
      callback(null, {
        location: featured.place_name,
        coordinates: { lat, long },
      });
    }
  });
};

module.exports = geocode;
