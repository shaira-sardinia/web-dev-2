const dbService = require("./src/utils/services/dbService");
const databaseInitService = require("./src/utils/services/databaseInit");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mainRouter = require("./src/routes/mainRoutes");
const adminRouter = require("./src/routes/adminRoutes");
const authRouter = require("./src/routes/userRoutes.js");
const userRoutes = require("./src/routes/userRoutes");
const enrolmentRoutes = require("./src/routes/enrolmentRoutes");
const errorRoutes = require("./src/routes/errorRoutes");
const displayAdmin = require("./src/utils/middlewares/displayAdmin");
const mustache = require("mustache-express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

require("dotenv").config();

app.engine("mustache", mustache(path.join(__dirname, "src/views/partials"), ".mustache"));
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(displayAdmin.setAdminFlag);

app.use(
  session({
    secret: "my-secret-token",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  res.locals.info_msg = req.flash("info");
  next();
});

app.use("/", mainRouter);
app.use("/admin", adminRouter);
app.use("/", authRouter);
app.use("/", userRoutes);
app.use("/", enrolmentRoutes);
app.use(errorRoutes);

async function startServer() {
  try {
    await databaseInitService.initializeDatabase();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start", error);
    process.exit(1);
  }
}

startServer();
