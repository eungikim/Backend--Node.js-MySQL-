require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const session = require("express-session");
const passport = require("./config/passport");

const sequelize = require("./utils/database");
const User = require("./models/user");
const { isLoggedIn } = require("./middleware/isLoggedIn");

const app = express();

app.use(
  session({
    secret: "user-login",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routes
const adminRoutes = require("./routes/adminRoute");
const authRoutes = require("./routes/authRoute");

app.use("/auth", authRoutes);

app.get("/", (req, res, next) => {
  res.json({ message: "Hi, welcome" });
});

app.get("/test", (req, res) => {
  res.send('<h1>Home Page</h1><a href="/auth/google">Login with Google</a>');
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/profile", isLoggedIn, (req, res) => {
  res.send(
    `<h1>Hello, ${req.user.displayName}!</h1><img src="${req.user.imageUrl}" alt="Profile Image"><br><a href="/logout">Logout</a>`
  );
});

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user/", authRoutes);

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
    app.listen(8080, () => {
      console.log("Server running...");
    });
  })
  .catch((err) => {
    console.log("Connecting to mysql failed", err);
  });
