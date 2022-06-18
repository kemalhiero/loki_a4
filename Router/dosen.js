const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);
const authenticateToken = require(`../middleware/authToken`);

router.set("view engine", "ejs");
router.use(express.static("public"));

router.use("/", (req, res, next) => {
  const role = req.cookies.role;
  if (role != "D") return res.render("eror403");

  next();
});

//lihat daftar dosen
router.get("/", authenticateToken, controller.lecturers.retrieveAll);

//    ---RPS---
router.get("/rps", controller.rps.rpsDosen);
router.get("/tambahrps",controller.rps.tampilTambahRPS);
router.get("/detailrps", controller.rps.detailRPS);


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
router.get("/referensi", controller.referensi.retrieveAll); //lihat daftar referensi

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
