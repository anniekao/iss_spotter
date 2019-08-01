const { fetchMyIP } = require('./iss');
const { fetchCoordsByIp } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  console.log("It worked! IP returned: ", ip);
});

// fetchCoordsByIp('66.207.199.230', (error, data) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }
//   console.log("Returned coordinates: ", data);
// });
