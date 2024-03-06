const express = require("express");
const router = express.Router();
const userDetails = require("../model/schema");
const videoDetails = require("../model/schema");

// Registration route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await userDetails.findOne({ email });

    if (user) {
      return res.status(409).send("User already Exists");
    }

    //create new user
    user = new userDetails({
      username,
      email,
      password,
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// Login route

router.post("/login", async (req, res) => {
  try {
    const { username, email } = req.body;
    let user = await userDetails.findOne({ username, email });

    if (!user) {
      return res.status(401).send("Invalid Credentials ");
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
