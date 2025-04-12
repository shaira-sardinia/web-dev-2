const express = require("express");
const path = require("path");
const public = path.join(__dirname, "public");
const bodyParser = require("body-parser");
const mainRouter = require("./src/routes/mainRoutes");
const adminRouter = require("./src/routes/adminRoutes");
const authRouter = require("./src/routes/userRoutes.js");
const errorRoutes = require("./src/routes/errorRoutes");
const mustache = require("mustache-express");
const cookieParser = require("cookie-parser");
const app = express();

require("dotenv").config();

app.engine("mustache", mustache(path.join(__dirname, "src/views/partials"), ".mustache"));
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/", mainRouter);
app.use("/admin", adminRouter);
app.use("/", authRouter);

app.use(errorRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000. Ctrl^C to quit");
});
