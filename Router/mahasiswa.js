const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);
const authenticateToken = require(`../middleware/authToken`);

router.set("view engine", "ejs");
router.use(express.static("views"));

//route mengubah/membuat RPS yang sudah ada didalam Web
router.get("/rps", controller.rps.rpsMahasiswa);

router.get("/detailrps", controller.rps.detailRPSMahasiswa);

module.exports = router;
