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
    console.log(response.data);
}).catch((e) => {
    if(e.code === "ENOTFOUND"){
        console.log("Unable to connect to API servers.")
    }else {
        console.log(e.message);
    }
});
