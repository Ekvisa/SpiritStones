const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();

const router = jsonServer.router(path.join(__dirname, "../db/db.json"));

server.use(jsonServer.defaults());
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("API running on port", port);
});
