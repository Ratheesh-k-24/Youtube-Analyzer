const express = require("express");
const router = express.Router();
const Video = require("../model/schema").Video;
const User = require("../model/schema").User;



router.get("/users/edit/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("edit", { user });
    console.log(user);
  } catch (error) {
    console.error("Error fetching user data for editing:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/users/edit/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id);
    res.redirect("/admin/users");
    console.log(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/users/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    const users = await User.find({});
    res.render("adminView", { users });
    //res.redirect("/admin/users"); 
    // console.log("users");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error deleting the data");
  }
});



module.exports = router;
