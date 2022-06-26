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
router.get("/tambahcpmk",(req,res) => {
    res.send("Tambah CPMK");
  }
);

router.put("/ubahcpmk",(req,res) => {
    res.send("Ubah CPMK");
  }
);

router.delete("/hapuscpmk",(req,res) => {
    res.send("Hapus CPMK");
  }
);

//    ---REFERENSI---

router.get("/tambahreferensi",(req,res) => {
    res.send("Tambah Referensi");
  }
);

router.put("/ubahreferensi",(req,res) => {
    res.send("Ubah Referensi");
  }
);

router.delete("/hapusreferensi",(req,res) => {
    res.send("Hapus Referensi");
  }
);

//    ---KOMPONEN PENILAIAN---
router.get("/tambahkomponen",(req,res) => {
    res.send("Tambah komponen");
  }
);

router.put("/ubahkomponen", (req,res) => {
    res.send("Ubah komponen");
  }
);

router.delete("/hapuskomponen",(req,res) => {
    res.send("Hapus komponen");
  }
);

//    ---PERTEMUAN MINGGUAN---
router.get("/tambahpertemuan-mingguan",(req,res) => {
    res.send("Tambah Pertemuan Mingguan");
  }
);

router.put("/ubahpertemuan-mingguan",(req,res) => {
    res.send("Ubah Pertemuan Mingguan");
  }
);

router.delete("/hapuspertemuan-mingguan",(req,res) => {
    res.send("Hapus Pertemuan Mingguan");
  }
);

module.exports = router;
