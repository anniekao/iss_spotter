const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passes) => {
    printPasses(passes);
  })
  .catch((error) => {
    console.log("No dice! ", error.message);
  });

const printPasses = (passes) => {
  for (let pass of passes) {
    let date = new Date(pass.risetime * 1000);
    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }
};