const express = require("express");
const fs = require("fs");
const router = express.Router();

//Routes for Comment Details

// Comments for videoname 
router.get('/videos/:videoName', async (req, res) => {
    try {
      const videoName = req.params.videoName;
      console.log("Video Name:", videoName);
      const video = await Video.findOne({ videoName });
      console.log("Video:", video); 
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
      res.json(video.comments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  //comments  filtering (positive or negative)
router.get('/videos/:videoName/comments/:sentiment', async (req, res) => {
    try {
      const videoName = req.params.videoName;
      const sentiment = req.params.sentiment;
      const video = await Video.findOne({ videoName });
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
      let filteredComments;
      if (sentiment === 'positive') {
        filteredComments = video.comments.filter(comment => isPositive(comment));
      } else if (sentiment === 'negative') {
        filteredComments = video.comments.filter(comment => isNegative(comment));
      } else {
        return res.status(400).json({ message: 'Invalid sentiment parameter' });
      }
      res.json(filteredComments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


 // functionality  for positive and negative comments 
  function isPositive(comment) {
    const positiveKeywords = ['great', 'amazing', 'fantastic', 'awesome', 'excellent','informative','interesting','delicious','love','thanks for sharing','thanks',
    'great','entertaining','beautiful','soothing','impressive','mind blowing','clear' ,'inspiring','fabulous','adorable','relaxing'];
    for (const keyword of positiveKeywords) {
      if (comment.toLowerCase().includes(keyword)) {
        return true;
      }
    }
    return false;
  }
  
  function isNegative(comment) {
    const negativeKeywords = ['terrible', 'awful', 'horrible', 'disappointing', 'bad','too basic','not helpful','too intense','boring','complicated','lost','too complex','gross'];
    for (const keyword of negativeKeywords) {
      if (comment.toLowerCase().includes(keyword)) {
        return true;
      }
    }
    return false;
  }
  

//Routes for Subscription Details

app.get('/video', async (req, res) => {
    try {
      const videos = await Video.find().sort({ views: -1 });
      res.render('videos', { videos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

//Routes for  Frequent User Details
const youtubeUserData = [];
function getUserViewCounts(data) {
  const ViewCounts = {};
  data.forEach((youtube) => {
    const { user_name } = youtube;
    if (viewCounts[user_name]) {
      viewCounts[user_name]++;
    } else {
      viewCounts[user_name] = 1;
    }
  });
  return viewCounts;
}
function filterFrequentUsers(viewCounts, threshold) {
  return Object.entries(viewCounts)
    .filter(([user, count]) => count > threshold)
    .map(([user, count]) => ({ user, count }));
}
const threshold = 5;
router.get("/frequent-users", (req, res) => {
  fs.readFile("user.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading data file");
    }
    const youtubeUserData = JSON.parse(data);
    const userViewCounts = getUserViewCounts(youtubeUserData);
    const filterFrequentUsers = filterFrequentUsers(userViewCounts, threshold);
    res.render("frequent-users", { sortedUsers: frequentUsers });
  });
});

//Routes for Admin View
app.get("/admin/dashboard", isLoggedIn, (req, res) => {
  if (req.user.role === "Admin") {
    // Implement logic to fetch and display admin dashboard
    res.render("admin-dashboard", { user: req.user });
  } else {
    res.redirect("/login"); // Redirect non-admin users
  }
});

// Route to render manage users page for admin
app.get("/admin/manage-users", isLoggedIn, (req, res) => {
  if (req.user.role === "Admin") {
    // Implement logic to fetch and display user accounts
    User.find({}, (err, users) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.render("manage-users", { users });
      }
    });
  } else {
    res.redirect("/login"); // Redirect non-admin users
  }
});

// Route to add new users by admin
app.post("/admin/add-user", isLoggedIn, (req, res) => {
  if (req.user.role === "Admin") {
    // Implement logic to add new users
    const { username, password, role } = req.body;
    User.register(new User({ username, role }), password, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding user");
      } else {
        res.redirect("/admin/manage-users");
      }
    });
  } else {
    res.redirect("/login"); // Redirect non-admin users
  }
});

// Route to deactivate users by admin
app.post("/admin/deactivate-user/:userId", isLoggedIn, (req, res) => {
  const { userId } = req.params;
  if (req.user.role === "Admin") {
    // Implement logic to deactivate user
    User.findByIdAndUpdate(userId, { $set: { active: false } }, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deactivating user");
      } else {
        res.redirect("/admin/manage-users");
      }
    });
  } else {
    res.redirect("/login"); // Redirect non-admin users
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 2000");
});

module.exports = router;
