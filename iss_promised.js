const request = require('request-promise-native');


const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const latitude = JSON.parse(body).data.latitude;
  const longitude = JSON.parse(body).data.longitude;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const response = JSON.parse(data).response;
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };