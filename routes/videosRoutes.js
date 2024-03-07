const express = require('express');
const router = express.Router();
const Video = require('../model/schema').Video;

// Routes for Subscription Details

router.get('/views/subscription', async (req, res) => {
  try {
    const videos = await Video.find({}, { video_name: 1, views: 1, subscription: 1 }).sort({ views: -1 });
    // res.json({ videos });
    res.render('subscription',{ youtubeUserData: videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
