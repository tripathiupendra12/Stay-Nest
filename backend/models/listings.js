const mongoose = require("mongoose");
const Review = require("./reviews.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            default: "Point",
            required: true
        },
        coordinates: {
            type: [Number],
            default: [0,0]
        }
    },
    category: {
        type: String,
        required: true,
        enum : [
            "Beach",
            "Mountain",
            "Camping",
            "Hotel",
            "Villas",
            "Farmhouse",
            "Iconic Cities",
            "Amazing Pools",
            "Rooms",
            "Castles",
            "Trending",
            "Boats",
            "Arctic"
        ]
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: { $in: listing.reviews }});
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;


// filename : {
//             type: String
//         },
//         url: {
//             type: String,
//             default: "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?q=80&w=1144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//             set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?q=80&w=1144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
//         }