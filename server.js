const mongoose = require("mongoose");
const dotenv = require("dotenve");
const Hapi = require("@hapi/hapi");


dotenv.config();

const server = Hapi.server({
    port: process.env.PORT || 4000,
    host:"localhost",
    routes: {
        cors:{
            origin: ["*"],
            headers: ["Accept", "Content-Type", "Authorization"],
        }
    }
})