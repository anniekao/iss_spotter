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
      const msg = `Status code: ${response.statusCode} when fetching coordinates. Reponse: ${data}`;
      callback(Error(msg), null);
      return;
    }
    const latitude = JSON.parse(data).data.latitude;
    const longitude = JSON.parse(data).data.longitude;
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`

  request(url, (error, response, data) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code: ${response.statusCode} when fetching ISS data. Response ${data}`;
      callback(Error(msg), null);
      return;
    }

    const passes = JSON.parse(data).response;
    callback(null, passes);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIp(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) {
          return callback(error, null);
        } 
        
        callback(null, passes);
      });

    });

  });

};

module.exports = { nextISSTimesForMyLocation };