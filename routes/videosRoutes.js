const express = require("express");
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

//Routes for  Frequent User Details

//Routes for Admin View

module.exports = router;
