const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);
const authenticateToken = require(`../middleware/authToken`);

router.set("view engine", "ejs");
router.use(express.static("views"));

router.use("/", (req, res, next) => {
  const role = req.cookies.role;
  if (role != "T") return res.render("eror403");

  next();
});

router.get("/rps", (req, res) => {
  const role = req.cookies.role;
  const nama = req.cookies.nama;
  res.render("rpsadmin", { role: role, nama: nama, dasbordaktif: "", rpsaktif: "active" });
});

router.get(
  "/menentukandosen",
  (
    req,
    res //menentukan dosen yang akan membuat/memperbaharui RPS
  ) => {
    const role = req.cookies.role;
    const nama = req.cookies.nama;
    res.render("menentukandosen", { role: role, nama: nama, dasbordaktif: "", rpsaktif: "active" });
  }
);

router.get(
  "/lihat-laporan-rps",
  (
    req,
    res //melihat laporan terkait RPS yang ada
  ) => {
    let obj = {
      "list-rps": ["rps ini", "rps itu"],
      "persentase-project-base": 40,
      "persentase-case-base": 60,
    };
    res.json(obj);
  }
);

router.get(
  "/cetaklaporan",
  (
    req,
    res //mencetak laporan terkait
  ) => {
    res.send("cetak laporan");
  }
);

module.exports = router;
