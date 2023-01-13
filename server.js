/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const express = require("express");
const next = require("next");

const { drawCanvas } = require("./server/textures/index");
const drawCanvasThree = require("./server/threeRend/index");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Read the certificate and the private key for the https server options 
const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("./config/key.pem"),
  cert: fs.readFileSync("./config/cert.pem"),
};

app.prepare().then(() => {
  const server = express();
  const httpsServer = https.createServer(options, server);
  server.get("/drawCanvasImage", function (req, res) {
    return res.end(drawCanvas());
  });
  server.get("/drawCanvasThree", function (req, res) {
    drawCanvasThree();
    const data =
      '{"name": "yogesh","surname": "bangar","job": "drawCanvasThree"}';
    return res.end(data);
  });
  server.all("*", (req, res) => {
    return handle(req, res);
  });
  // server.listen(port, () => {
  //   console.log(`> Ready on http://localhost:${port}`);
  // });
  httpsServer.listen(port, () => {
    console.log(`> Ready on https://localhost:${port}`);
  });
});
