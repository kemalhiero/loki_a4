const express = require("express");
const router = express.Router();

//request halaman depan
router.get("/", (req, res) => {
  res.send("Welcome");
});

//request halaman login
router.get("/Login", (req, res) => {
  res.send("<h3>Silahkan Login</h3>");
});

//request halaman homepage (beranda)
router.get("/home", (req, res) => {
  res.send("HOME");
});

//request halaman about
router.get("/about", (req, res) => {
  res.send("Ini Adalah Halaman about");
});

//request halaman profil
router.get("/profile", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Selamat Datang");
});

//request halaman salam, nama, nim
router.get("/salam/:nama/:nim", function (req, res) {
  res.send("Selamat Sore " + req.params.nama + " <br>nim anda " + req.params.nim);
});

module.exports = router;