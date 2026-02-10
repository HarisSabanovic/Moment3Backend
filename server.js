const mongoose = require("mongoose");
const dotenv = require("dotenv");
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

//MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error(error));


//startar servern
const init = async () => {
    await server.start();
    console.log(`Server running on ${server.info.url}`);
};

init().catch((error) => {
    console.error(error);
    process.exit(1);
})

