const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const mongoose = require("mongoose");
const User = mongoose.model("user");

const router = express.Router();

router.use("/user", requireAuth);

// Get user information
router.get("/user", async (req, res) => {
  try {
    const user = await User.findById(req.user.toString());
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user information
router.put("/user", async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.user.toString());

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(req.body);
    // Update user information
    user.username = req.body.username || user.username;
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.address.street = req.body.address?.street || user.address.street;
    user.address.city = req.body.address?.city || user.address.city;
    user.address.state = req.body.address?.state || user.address.state;
    user.address.postalCode =
      req.body.address?.postalCode || user.address?.postalCode;
    user.address.country = req.body.address?.country || user.address.country;

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
});

module.exports = router;

module.exports = router;
