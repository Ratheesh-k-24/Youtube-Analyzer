const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoId: String,
  videoCategory: String,
  videoName: String,
  views: Number,
  comments: String,
  subscription: Number,
});

const userSchema = new mongoose.Schema({
  userid: String,
  username: String,
  email: String,
  password: String,
  usertype: String,
});

const videoDetails = mongoose.model("Videos", videoSchema);
module.exports = videoDetails;
const userDetails = mongoose.model("Users", userSchema);
module.exports = userDetails;
