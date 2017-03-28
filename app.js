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
