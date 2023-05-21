require("./models/User");
require("./models/Track");
require("./models/Restaurant");
require("./models/MenuItem");
require("./models/Review");
require("./models/Order");

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/TrackRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
//const menuItemRoutes = require("./routes/menuItemRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");
const connectionString = `mongodb+srv://joco:adminadmin@cluster0.963f3kw.mongodb.net/`;
const app = express();
const restaurantData = require("./data/restaurants.json");
const Restaurant = mongoose.model("Restaurant");
app.use(bodyParser.json());

app.use(restaurantRoutes);
//app.use(menuItemRoutes);
app.use(reviewRoutes);
app.use(orderRoutes);
app.use(authRoutes);
app.use(trackRoutes);
app.use(userRoutes);
mongoose.connect(connectionString);

// const insertRestaurantData = async () => {
//   try {
//     // Sample restaurant data

//     // Insert the restaurant data into the database
//     console.log("Inserting data ");
//     await Restaurant.insertMany(restaurantData);
//     console.log("Restaurant data inserted successfully");
//   } catch (error) {
//     console.error("Error inserting restaurant data:", error);
//   }
// };

//insertRestaurantData();

mongoose.connection.on("error", (error) => {
  console.log(error);
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
