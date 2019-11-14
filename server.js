const express = require("express");

const AccountRouter = require("./router.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", AccountRouter);

module.exports = server;
