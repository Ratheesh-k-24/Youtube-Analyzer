const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const videosRoutes = require("./routes/videosRoutes");
require("./model/db");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
app.set("view engine", "ejs");

app.use("/api", userRoutes);
app.use("/api", videosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
