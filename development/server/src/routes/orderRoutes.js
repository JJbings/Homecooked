// Import required modules and models
const express = require("express");

const mongoose = require("mongoose");
const Order = mongoose.model("Order");

const orderRouter = express.Router();

// GET all orders
orderRouter.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single order by ID
orderRouter.get("/order/:id", getOrder, (req, res) => {
  res.json(res.order);
});

// CREATE new order
orderRouter.post("/order", async (req, res) => {
  const order = new Order({
    user: req.body.user,
    restaurant: req.body.restaurant,
    items: req.body.items,
    total: req.body.total,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE order by ID
orderRouter.patch("/order/:id", getOrder, async (req, res) => {
  if (req.body.user != null) {
    res.order.user = req.body.user;
  }

  if (req.body.restaurant != null) {
    res.order.restaurant = req.body.restaurant;
  }

  if (req.body.items != null) {
    res.order.items = req.body.items;
  }

  if (req.body.total != null) {
    res.order.total = req.body.total;
  }

  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE order by ID
orderRouter.delete("/order/:id", getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get single order by ID
async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }
    res.order = order;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = orderRouter;
