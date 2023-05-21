const express = require("express");
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const restaurantRouter = express.Router();

// Create a new restaurant
// restaurantRouter.post("/restaurant", async (req, res) => {
//   console.log("creating restaurant");
//   const { name, address, phone, email, description, image } = req.body;
//   const restaurant = new Restaurant({
//     name,
//     address,
//     phone,
//     email,
//     description,
//     image,
//   });
//   try {
//     await restaurant.save();
//     res.status(201).json(restaurant);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// restaurantRouter.post("/restaurants", async (req, res) => {
//   req.body.map(async (restaurant) => {
//     const { name, address, phone, email, description, image } = restaurant;
//     const newRestaurant = new Restaurant({
//       name,
//       address,
//       phone,
//       email,
//       description,
//       image,
//     });
//     try {
//       await newRestaurant.save();
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
//   res.status(201).json({ message: "Restaurants created" });
// });

// Get all restaurants
restaurantRouter.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single restaurant by ID
restaurantRouter.get("/restaurant/:id", getRestaurant, (req, res) => {
  res.json(res.restaurant);
});

// Update a restaurant by ID
restaurantRouter.put("/restaurant/:id", getRestaurant, async (req, res) => {
  try {
    const updatedRestaurant = await res.restaurant.set(req.body).save();
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a restaurant by ID
restaurantRouter.delete("/restaurant/:id", getRestaurant, async (req, res) => {
  try {
    await res.restaurant.remove();
    res.json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a restaurant by ID
async function getRestaurant(req, res, next) {
  let restaurant;
  try {
    restaurant = await Restaurant.findById(req.params.id);
    if (restaurant === null) {
      return res.status(404).json({ message: "Cannot find restaurant" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.restaurant = restaurant;
  next();
}

module.exports = restaurantRouter;
