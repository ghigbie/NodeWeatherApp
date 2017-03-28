const yargs = require("yargs"),
      axios = require("axios");

const argv = yargs
    .options({
        a:{
            demand: true,
            alias: "address",
            describe: "Address is required to fetch the weather.",
            string: true
        }
    })
    .help()
    .alias("help", "h")
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === "ZERO_RESULTS"){
        throw new Error("Unable to find that address");
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var apiKey = "9f6325a874ba4e46242d3e5e3c349a27";
    var ulrDarkSky = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(urlDarkSky);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTempurature = response.data.currently.apparentTemperature;
}).catch((e) => {
    if(e.code === "ENOTFOUND"){
        console.log("Unable to connect to API servers.")
    }else {
        console.log(e.message);
    }
});
