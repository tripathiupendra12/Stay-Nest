const Review = require("../models/reviews.js");
const Listing = require("../models/listings.js");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body);
  newReview.author = req.user.id;
  await newReview.save();
  listing.reviews.push(newReview._id);
  await listing.save();

  res.json({
    success: true,
    message: "New Review Created!",
  });
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  return res.json({
    success: true,
    message: "Review Deleted!",
  });
};
