const mongoose = require("mongoose");
const { Video, User } = require("./schema");

mongoose
  .connect("mongodb://localhost:27017/YoutubeAnalyzer", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

module.exports = mongoose.connection;
module.exports.Video = Video;
module.exports.User = User;
