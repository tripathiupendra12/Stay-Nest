const jwt = require("jsonwebtoken");
const Listing = require("../models/listings.js");
const Review = require("../models/reviews.js");

const isLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({
        message: "Login required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "mySuperSecretKey");
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Invalid token",
    });
  }
};

const isOwner = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.json({ message: "User not authenticated" });
    }

    const { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
      return res.json({ message: "Listing not found" });
    }

    if (!listing.owner._id.equals(req.user.id)) {
      return res.json({
        success: false,
        message: "You are not the owner of this listing.",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({ message: "Error occurred" });
  }
};

const isReviewAuthor = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.json({ message: "User not authenticated" });
    }

    const { reviewId } = req.params;

    let review = await Review.findById(reviewId);

    if (!review) {
      return res.json({ message: "review not found" });
    }

    if (!review.author._id.equals(req.user.id)) {
      return res.json({
        success: false,
        message: "You are not the author of this review.",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({ message: "Error occurred" });
  }
};

module.exports = {isLoggedIn, isOwner, isReviewAuthor};
