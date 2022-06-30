const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);

router.set("view engine", "ejs");
router.use(express.static("public"));


//    ---RPS---
router.get("/rps", controller.dosen.rpsDosen);
router.get("/tambahrps-:id",controller.dosen.tampilTambahRPS);
router.get("/detailrps-:id", controller.dosen.detailRPS);
router.get("/ubahrps-:id",controller.dosen.tampilUbahRPS);
router.get("/revisirps-:id",controller.dosen.tampilRevisiRPS);

router.post("/tambahrps",(req,res) => {
    res.send("Tambah RPS");
  }
);

router.put("/ubahrps",(req,res) => {
    res.send("Ubah RPS");
  }
);

router.put("/revisirps",(req,res) => {
    res.send("Revisi RPS");
  }
);

//    ---CPMK---
router.post("/tambahcpmk", controller.dosen.tambahCPMK);
router.post("/ubahcpmk", controller.dosen.ubahCPMK);
router.get("/hapuscpmk-:idhapus", controller.dosen.hapusCPMK);

//    ---REFERENSI---
router.post("/tambahreferensi",controller.dosen.tambahReferensi);
router.post("/ubahreferensi",controller.dosen.ubahReferensi);
router.get("/hapusreferensi-:idhapus", controller.dosen.hapusReferensi);

//    ---KOMPONEN PENILAIAN---
router.post("/tambahkomponen", controller.dosen.tambahKompPenilaian);
router.post("/ubahkomponen", controller.dosen.ubahKompPenilaian);
router.get("/hapuskomponen-:idhapus",controller.dosen.hapusKompPenilaian);

//    ---PERTEMUAN MINGGUAN---
router.post("/tambahpertemuan-mingguan", controller.dosen.tambahPertMingguan);
router.post("/ubahpertemuan-mingguan", controller.dosen.ubahPertMingguan);
router.get("/hapuspertemuan-mingguan-:idhapus", controller.dosen.hapusPertMingguan);

module.exports = router;
