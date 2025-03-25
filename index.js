const express = require("express");
const mustache = require("mustache-express");
const path = require("path");
// const public = public.join(__dirname, "public");
const bodyParser = require("body-parser");
const router = require("./routes/mainRoutes");

const app = express();

// app.use(express.static(public));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("mustache", mustache());
app.set("view engine", "mustache");

app.use("/", router);

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.listen(3000, () => {
  console.log("Server started on port 3000. Ctrl^C to quit");
});
