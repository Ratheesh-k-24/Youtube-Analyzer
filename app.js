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

app.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const details = await User.findById(id);
    res.render("edit", { User: details });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Updating the User");
  }
});

app.post("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
      await User.findByIdAndUpdate(id, req.body);
      res.redirect("/");
  } catch (err) {
      console.error("Error editing sports:", err.message);
      res.redirect(`/edit/${id}` );
  }
});
app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
      await User.findByIdAndDelete(id);
      res.redirect("/");
  } catch (err) {
      console.error("Error deleting sports detail:", err.message);
      res.redirect("/");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
