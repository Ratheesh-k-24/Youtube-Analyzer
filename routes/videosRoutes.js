const express = require("express");
const fs = require("fs");
const router = express.Router();

//Routes for Comment Details

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

module.exports = router;
