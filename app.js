const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/details")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
const userRoutes = require("./routes/userRoutes");
const videosRoutes = require("./routes/videosRoutes");
require("./backend/model/db");

app.use(express.json());
app.use(express.static("views"));

app.use("/api", userRoutes);
app.use("/api", videosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
