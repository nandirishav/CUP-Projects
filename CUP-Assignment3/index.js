const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const db = require("./config/mongoose");

//middlewares
// app.use((req, res, next) => {
//   // logic to not allow any route handlers to execute if user is not logged in
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }

//   next();
// });

// for maintenance mode
// app.use((req, res, next) => {
//   res.status(503).send('Site under maintenance , Please come back later !');
//   next();
// });

app.use(express.json());
app.use("/", require("./routes"));

app.listen(port, () => {
  console.log("Listening at port", port);
});
