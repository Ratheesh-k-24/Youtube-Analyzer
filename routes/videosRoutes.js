const express = require('express');
const router = express.Router();
const Video = require('../model/schema').Video;


// Route to retrieve all comments for a specific video
router.get('/:video_name', async (req, res) => {
  try {
      const { video_name } = req.params;
      console.log(video_name);
      const video = await Video.findOne({ video_name });
            console.log(video);
      if (!video) {
          return res.status(404).json({ message: 'Video not found' });
      } else {
          res.render('comments', { filteredComments: video.comments, videoName: video_name });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});



// Route to filter comments by sentiment for a specific video
router.get('/comments/:videoName', async (req, res) => {
  try {
    
      const videoName = req.params.videoName;
      //console.log(videoName);
      const sentiment = req.query.sentiment;
      //console.log(sentiment);
      const video = await Video.findOne({ video_name:videoName });
      //console.log(video);
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
      res.render('comments', { filteredComments: filteredComments, videoName });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Utility function to check if a comment is positive
function isPositive(comment) {
  const positiveKeywords = ['great', 'amazing', 'fantastic', 'awesome', 'excellent', 'informative', 'interesting', 'delicious', 'love', 'thanks for sharing', 'thanks', 'entertaining', 'beautiful', 'soothing', 'impressive', 'mind blowing', 'clear', 'inspiring', 'fabulous', 'adorable', 'relaxing'];
  return positiveKeywords.some(keyword => comment.toLowerCase().includes(keyword));
}

// Utility function to check if a comment is negative
function isNegative(comment) {
  const negativeKeywords = ['terrible', 'awful', 'horrible', 'disappointing', 'bad', 'too basic', 'not helpful', 'too intense', 'boring', 'complicated', 'lost', 'too complex', 'gross'];
  return negativeKeywords.some(keyword => comment.toLowerCase().includes(keyword));
}

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
