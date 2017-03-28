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
    console.log(response.data);
});
