/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');
const fetchMyIP = callback => {
  request("https://api.ipify.org?format=json", (error, response, data) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status code: ${response.statusCode} when fetching IP. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(data).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIp = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, data) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status code: ${response.statusCode} when fetching IP. Reponse: ${data}`;
      callback(Error(msg), null);
      return;
    }
    const latitude = JSON.parse(data).data.latitude;
    const longitude = JSON.parse(data).data.longitude;
    callback(null, {latitude, longitude});
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp };