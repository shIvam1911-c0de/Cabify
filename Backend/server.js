// this is our main file so we change in package.json me main  "server.js" insted of "index.js"

const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");
const port = process.env.PORT;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, ()=>{
    console.log(`server started at port ${port}`);
});