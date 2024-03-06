const express = require("express");
const router = express.Router();

//Routes for Comment Details

//Routes for Subscription Details

//Routes for  Frequent User Details

//Routes for Admin View

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
    console.error("Error editing User:", err.message);
    res.redirect(`/edit/${id}`);
  }
});
app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting User detail:", err.message);
    res.redirect("/");
  }
});
module.exports = router;
