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

module.exports = mongoose.model("Videos", videoSchema);
module.exports = mongoose.model("Users", userSchema);
