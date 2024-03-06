const express = require("express");
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

//Routes for Admin View

module.exports = router;
