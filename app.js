require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const sequelize = require("./utils/database");

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(express.json());

// Routes
const adminRoutes = require("./routes/adminRoute");
const authRoutes = require("./routes/authRoute");

app.get("/", (req, res, next) => {
  res.json({ message: "Hi, welcome" });
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
