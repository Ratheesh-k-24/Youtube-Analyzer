const express = require("express");
const app = express();
const { Video, User } = require("./model/schema");
//const userRoutes = require("./routes/userRoutes");
//const videosRoutes = require("./routes/videosRoutes");
require("./model/db");

app.use(express.json());
app.use(express.static("views"));

//app.use("/api", userRoutes);
//app.use("/api", videosRoutes);
app.use("/api",{Video,User});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
