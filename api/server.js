const { createServer } = require("http");
const { parse } = require("url");
const handler = require("../../server/dist/server.js");

module.exports = async (req, res) => {
  const parsedUrl = parse(req.url, true);
  const server = createServer(handler);
  server.emit("request", req, res);
};