require("./models/User");
require("./models/Track");
require("./models/Restaurant");
require("./models/MenuItem");
require("./models/Review");
require("./models/Order");
const requireAuth = require("./middlewares/requireAuth");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/TrackRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");

const bodyParser = require("body-parser");

const connectionString = `mongodb+srv://joco:adminadmin@cluster0.963f3kw.mongodb.net/`;
const app = express();

app.use(bodyParser.json());

app.use(restaurantRoutes);
app.use(reviewRoutes);
app.use(orderRoutes);
app.use(authRoutes);
// app.use(trackRoutes);

mongoose.connect(connectionString);

mongoose.connection.on("error", (error) => {
  console.log(error);
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

app.get("/", (req, res) => {
  console.log("home request");
  res.send(`Your email: `);
});

app.listen(3005, () => {
  console.log("Example app listening on port 3005!");
});
