const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Create a new review
router.post("/review", async (req, res) => {
  try {
    const review = new Review({
      restaurant: req.body.restaurant,
      user: req.body.user,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all reviews for a restaurant
router.get("/restaurant/:restaurantId", async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single review by ID
router.get("/review/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) throw Error("Review not found");
    res.json(review);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Update a review by ID
router.patch("/review/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) throw Error("Review not found");
    review.rating = req.body.rating;
    review.comment = req.body.comment;
    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Delete a review by ID
router.delete("/review/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) throw Error("Review not found");
    await review.remove();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
