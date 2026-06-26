const User = require("../models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
      });
      await newUser.save();

      res.json({
        success: true,
        message: "Welcome to StayNest!",
      });
    } catch (e) {
      res.json({
        error: true,
        message: e.message,
      });
    }
  }

  module.exports.signin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.json({
          message: "All fields required",
        });
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.json({
          message: "User not found",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({
          message: "Wrong password",
        });
      }
      
      //Token
      const token = jwt.sign({ id: user._id }, "mySuperSecretKey", {
        expiresIn: "1d",
      });
  
      res.json({
        success: true,
        token,
        message: "Login Successful"
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "Internal server error",
      });
    }
  }