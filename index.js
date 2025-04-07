const express = require("express");
const path = require("path");
// const public = public.join(__dirname, "public");
const bodyParser = require("body-parser");
const mainRouter = require("./src/routes/mainRoutes");
const adminRouter = require("./src/routes/adminRoutes");
const errorRoutes = require("./src/routes/errorRoutes");

const app = express();

const mustache = require("mustache-express");

app.engine("mustache", mustache());

app.set("view options", {
  partials: path.join(__dirname, "src", "views", "layouts"),
});

app.set("views", path.join(__dirname, "src", "views"));

app.set("view engine", "mustache");

// app.use(express.static(public));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", mainRouter);
app.use("/admin", adminRouter);

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.use(errorRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000. Ctrl^C to quit");
});
