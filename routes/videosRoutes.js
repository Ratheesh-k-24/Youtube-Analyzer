const express = require("express");
const router = express.Router();

//Routes for Comment Details

//Routes for Subscription Details

//Routes for  Frequent User Details

//Routes for Admin View
app.get("/admin/dashboard", isLoggedIn, (req, res) => {
  if (req.user.role === "Admin") {
    // Implement logic to fetch and display admin dashboard
    res.render("admin-dashboard", { user: req.user });
  } else {
    res.redirect("/login"); // Redirect non-admin users
  }
});

// Route to render manage users page for admin
app.get("/admin/manage-users", isLoggedIn, (req, res) => {
  if (req.user.role === "Admin") {
    // Implement logic to fetch and display user accounts
    User.find({}, (err, users) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.render("manage-users", { users });
      }
    });
  } else {
    res.redirect("/login"); // Redirect non-admin users
  }
});

// Route to add new users by admin
app.post("/admin/add-user", isLoggedIn, (req, res) => {
  if (req.user.role === "Admin") {
    // Implement logic to add new users
    const { username, password, role } = req.body;
    User.register(new User({ username, role }), password, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding user");
      } else {
        res.redirect("/admin/manage-users");
      }
    });
  } else {
    res.redirect("/login"); // Redirect non-admin users
  }
});

// Route to deactivate users by admin
app.post("/admin/deactivate-user/:userId", isLoggedIn, (req, res) => {
  const { userId } = req.params;
  if (req.user.role === "Admin") {
    // Implement logic to deactivate user
    User.findByIdAndUpdate(userId, { $set: { active: false } }, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deactivating user");
      } else {
        res.redirect("/admin/manage-users");
      }
    });
  } else {
    res.redirect("/login"); // Redirect non-admin users
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 2000");
});

module.exports = router;
