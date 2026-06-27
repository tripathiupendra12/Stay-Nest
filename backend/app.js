if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const User = require("./models/users.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const chatRouter = require("./routes/chat.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() =>{
        console.log("connected to DB");
    }).catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(dbUrl);
}

const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));

app.get("/", (req, res) => {
    res.send("Backend is running");
})

app.use("/listings", listingRouter);
app.use((err, req, res, next) => {
    if(err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send("File size must be less than 20kb");
    }
    res.status(500).send(err.message);
});
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/chat", chatRouter);

app.use((err, req, res, next) => {
    console.log(err);
    let {statusCode=500, message="something went wrong"} = err;
    res.status(statusCode).json({
        success : false,
        message
    });
});


app.listen(8080, () => {
    console.log("server is listening to port 8080");
});