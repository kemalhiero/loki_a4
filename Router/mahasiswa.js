const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);
const authenticateToken = require(`../middleware/authToken`);

router.set("view engine", "ejs");
router.use(express.static("views"));

//route mengubah/membuat RPS yang sudah ada didalam Web
router.get("/rps", (req, res) => {
  const role = req.cookies.role;
  const nama = req.cookies.nama;
  res.render("rpsmahasiswa", { role: role, nama: nama, dasbordaktif: "", rpsaktif: "active" });
});

router.get("/caridirps", (req, res) => {
  res.send("Ni halaman cari RPS");
});

router.get("/detailrps", (req, res) => {
  const role = req.cookies.role;
  const nama = req.cookies.nama;
  res.render("detailrpsmhs", { role: role, nama: nama, dasbordaktif: "", rpsaktif: "active" });
});

module.exports = router;
