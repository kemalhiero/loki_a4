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

router.get("/rps", controller.admin.tampilRpsAdmin);
router.get("/menentukandosen", controller.lecturers.tampilMenentukanDosen);
router.get("/laporanrpsmatkul",controller.admin.tampilLaporanRpsMatkul);
router.get("/persentaserps", controller.admin.tampilanPersentaseRPS);
router.get("/cetaklaporan", controller.admin.cetakLaporan);
router.get("/hmmm",controller.lecturers.retrieveAll); //untuk tezz

router.post("/tambahmatkul",controller.admin.tambahMatkul);
router.post("/editmatkul",controller.admin.editMatkul);

module.exports = router;
