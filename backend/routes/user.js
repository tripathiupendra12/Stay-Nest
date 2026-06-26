const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const userController = require("../controllers/users.js");

router.post(
  "/signup",
  wrapAsync(userController.signup),
);

router.post("/signin", userController.signin);

module.exports = router;
