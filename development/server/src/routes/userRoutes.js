const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const mongoose = require("mongoose");
const User = mongoose.model("User");

const userRouter = express.Router();
userRouter.use("/user", requireAuth);

orderRouter.get("/user", async (req, res) => {
	try {
		const orders = await Order.find();
		res.json(orders);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
