const mongoose = require("mongoose");

//videoschema

const videoSchema = new mongoose.Schema({
  video_id: String,
  video_category: String,
  video_name: String,
  views: Number,
  comments: [String],
  subscription: Number,
});

//user schema
const userSchema = new mongoose.Schema({
  username: String,
  userId: String,
  userType: String,
  userEmail: String,
  userPassword: String,
});

//schema model

const Video = mongoose.model("videos", videoSchema);
const User = mongoose.model("users", userSchema);

module.exports = {
  Video: Video,
  User: User,
};
