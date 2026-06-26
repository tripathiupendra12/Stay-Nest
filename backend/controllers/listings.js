const { model } = require("mongoose");
const Listing = require("../models/listings.js");
// const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  if (allListings.length === 0) {
    throw new ExpressError(200, "No listings found");
  }
  res.json(allListings);
};

module.exports.filterByCategory = async (req, res) => {
  const { category } = req.params;

  const listings = await Listing.find({
    category: category,
  });
  res.json(listings);
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    res.json({
      error: true,
      message: "Listing you requested for does not exist!",
    });
  }
  res.json(listing);
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body);
  newListing.owner = req.user.id;
  newListing.image = { url, filename };
  newListing.category = req.body.category;
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(req.body.location)}&format=json&limit=1`,
    {
      headers: {
        "User-Agent": "Stay-Nest-App",
      },
    },
  );
  const data = await response.json();

  if (data.length > 0) {
    const lon = parseFloat(data[0].lon);
    const lat = parseFloat(data[0].lat);
    newListing.geometry = {
      type: "Point",
      coordinates: [lon, lat],
    };
  }
  // console.log(newListing);
  await newListing.save();
  res.json({
    success: true,
    message: "New Listing Created!",
  });
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.json(listing);
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, req.body);
  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  res.json({
    success: true,
    message: "Listing Updated!",
  });
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.json({
    success: true,
    message: "Listing Deleted!",
  });
};
