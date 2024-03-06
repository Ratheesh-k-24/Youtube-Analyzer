const express = require("express");
const app = express();
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
