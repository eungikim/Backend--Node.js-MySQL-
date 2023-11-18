require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const session = require("express-session");
const passport = require("./config/passport");

const sequelize = require("./utils/database");
const Admin = require("./models/admin");

const { authenticateUser } = require("./middleware/currentUser");

dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

app.use(
  session({
    secret: "user-login",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
const adminRoutes = require("./routes/adminRoute");
const authRoutes = require("./routes/authRoute");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
// app.use("/api/v1/user", authenticateUser, "Later Route");

app.get("/", (req, res, next) => {
  res.json({ message: "Hi, welcome" });
});

app.get("/test", (req, res) => {
  res.send(
    '<h1>Home Page</h1><a href="/api/v1/auth/google">Login with Google</a>'
  );
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//404 middleware
app.use("*", (req, res, next) => {
  //'*' stands for all routes that do not match the all the above routes
  res.status(404).json({ message: "page not found" });
});

//General error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Something went error(error msg not passed)";
  res.status(statusCode).json({ message: message });
});

sequelize
  .sync()
  .then((result) => {
    return Admin.findByPk(1);
  })
  .then((admin) => {
    if (!admin) {
      return Admin.create({ email: "fayselcode@gmail.com", password: "admin" });
    }
    return admin;
  })
  .then((result) => {
    app.listen(8080, () => {
      console.log("Server running...");
    });
  })
  .catch((err) => {
    console.log("Connecting to mysql failed", err);
  });
