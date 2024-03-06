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

router.get('/videos', async (req, res) => {
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

app.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const details = await User.findById(id);
    res.render("edit", { User: details });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Updating the User");
  }
});

app.post("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body);
    res.redirect("/");
  } catch (err) {
    console.error("Error editing User:", err.message);
    res.redirect(`/edit/${id}`);
  }
});
app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting User detail:", err.message);
    res.redirect("/");
  }
});
module.exports = router;
