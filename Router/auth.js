const express = require('express');
const router = express.Router()
const controller = require(`../controllers/indexcontroller`);
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post("/login", (req, res) => 
{
    res.send("Ini adalah Halaman Login");
});

router.get("/logout", (req, res) => 
{
    res.send("Ini merupakan halaman logout");
});

module.exports = router;