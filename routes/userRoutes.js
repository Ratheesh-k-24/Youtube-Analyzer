const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/schema").User;

// Login page GET
router.get("/login", (req, res) => {
  res.render("authentication", {
    action: "/api/users/login",
    buttonText: "Login",
  });
});

// Registration page GET
router.get("/register", (req, res) => {
  res.render("authentication", {
    action: "/api/users/register",
    buttonText: "Register",
  });
});

// Registration route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Request body:", req.body); // Logging request body
    console.log("Password:", password); // Logging password
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("Hashed Password:", hashedPassword);
    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    console.log("User password:", user.password);
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    // Generate token
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
