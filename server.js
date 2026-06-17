require("dotenv").config();

const app =
    require("./app");

const connectDB =
    require("./config/db");

const http =
    require("http");

const { Server } =
    require("socket.io");


// Database Connect
connectDB();


// Create HTTP Server
const server =
    http.createServer(app);


// Socket.IO
const io =
    new Server(server, {

        cors: {

            origin: "*",

            methods: [
                "GET",
                "POST"
            ]

        }

    });


// Socket File
require("./socket/socket")(io);


// Port
const PORT =
    process.env.PORT || 5000;


// Start Server
server.listen(

    PORT,

    () => {

        console.log(
            `Server Running On Port ${PORT}`
        );

    }

);