const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);

router.set("view engine", "ejs");
router.use(express.static("views"));

router.post("/register", controller.users.register);
router.post("/login", controller.users.login);
router.post("/logout", controller.users.logout);

router.get("/login", (req, res) => {
  const role = req.cookies.role;
  if (role == "D" || role == "T") return res.redirect('/');
  
  res.render("auth-login");
});

router.get("/register", (req, res) => {
  res.render("register");
});
module.exports = router;
