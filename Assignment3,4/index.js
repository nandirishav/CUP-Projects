const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const altPort = 8000;
const db = require("./config/mongoose");

app.use(express.json());
app.use("/", require("./routes"));

app.listen(port || altPort, () => {
  console.log("Listening at port", port);
});
