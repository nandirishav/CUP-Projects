const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const altPort = 8001;
const db = require("./config/mongoose");
var cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use("/", require("./routes"));

app.listen(port || altPort, () => {
  console.log("Listening at port", port);
});
