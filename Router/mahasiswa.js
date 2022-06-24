const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);
const authenticateToken = require(`../middleware/authToken`);

router.set("view engine", "ejs");
router.use(express.static("public"));

//route mengubah/membuat RPS yang sudah ada didalam Web
router.get("/rps", controller.mahasiswa_dll.rpsMahasiswa);

router.get("/detailrps-:id", controller.mahasiswa_dll.detailRPSMahasiswa);

module.exports = router;
