const mongoose = require("mongoose");

require("./schema");

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
    res.status(500).json({ message: err.message });
  });

const db = mongoose.connection;
