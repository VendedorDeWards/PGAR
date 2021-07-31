const express = require("express");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch("./public");

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const PORT = 3000;
const app = express();
const server = app.listen(PORT);

app.use(connectLivereload());
app.use(express.static("public"));

console.log(`Server running on port: ${PORT}`);
