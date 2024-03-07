const express = require("express");
const router = express.Router();
const Video = require("../model/schema").Video;
const User = require("../model/schema").User;

//Routes for Admin View
router.get("/", async (req, res) => {
  const n = await user.find();
  res.send(n);
  console.log(n);
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.render("adminView", { users });
    console.log(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
});

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

//Routes for Comment Details

//Routes for Subscription Details

//Routes for  Frequent User Details

//Routes for Admin View
// Video.find().then((videos) => {
//   console.log(videos);
// });

// Routes for Subscription Details

// router.get('/views/subscription', async (req, res) => {
//   try {
//     const videos = await Video.find({}, { video_name: 1, views: 1, subscription: 1 }).sort({ views: -1 });
//     // res.json({ videos });
//     res.render('subscription',{ youtubeUserData: videos });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

module.exports = router;
