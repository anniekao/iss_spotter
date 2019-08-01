const { nextISSTimesForMyLocation } = require('./iss');

const printFlyoverTimes = (flyovers) => {
  for (let pass of flyovers) {
    let date = new Date(pass.risetime * 1000);
    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, data) => {
  if (error) {
    console.log("Failed to get data, ", error);
    return;
  }
  printFlyoverTimes(data);
});

