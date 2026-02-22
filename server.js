const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Hapi = require("@hapi/hapi");


const AuthRoutes = require("./Routes/AuthRoutes");
const BlogPostRoutes = require("./Routes/BlogPostRoutes");



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

// Routes
server.route(AuthRoutes);
server.route(BlogPostRoutes);

//startar servern
const init = async () => {
    await server.start();
};

init().catch((error) => {
    console.error(error);
    process.exit(1);
})

