const express = require('express');
const router = express()
const controller = require(`../controllers/indexcontroller`);

app.set('view engine', 'ejs');
app.use( express.static( "views" ) );

router.post("/register", controller.users.register);
router.post("/login", controller.users.login);
router.delete("/logout", controller.users.logout);

router.get("/login", (req, res) => 
{
    res.render('auth-login');
});

module.exports = router;