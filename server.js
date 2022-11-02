const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("/listUsers", function (req, res) {
    const data =
      '{"name": "yogesh","surname": "bangar","job": "software engineer"}';
      return res.end(data);
  });
  server.all("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
