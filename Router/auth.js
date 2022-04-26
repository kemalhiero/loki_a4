const express = require('express');
const router = express.Router()
const controller = require(`../controllers/indexcontroller`);

router.post("/register", controller.users.register);
router.post("/login", controller.users.login);
router.delete("/logout", controller.users.logout);

module.exports = router;