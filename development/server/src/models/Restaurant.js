const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: String,
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: String,
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  phone: {
    type: String,
  },
  menuItems: [
    {
      name: String,
      description: String,
      price: Number,
      image: String,
      category: String,
      type: String,
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
  },
});

mongoose.model("Restaurant", restaurantSchema);
