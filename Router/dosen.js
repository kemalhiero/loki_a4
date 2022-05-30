const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);
const authenticateToken = require(`../middleware/authToken`);

router.set('view engine', 'ejs');
router.use( express.static( "views" ) );

//lihat daftar dosen
router.get("/", authenticateToken, controller.lecturers.retrieveAll);

//    ---RPS---

router.get("/rps", (req, res) => 
{
    res.render('rpsdosen');
});

router.get("/tambahrps", (req, res) =>         //menambahkan RPS baru
{
    res.render('tambahrps');
});

router.get("/detailrps", (req, res) =>         //melihat detail RPS
{
    res.render('detailrps');
});

router.post("/tambahrps", (req, res) =>         //menambahkan RPS baru
{
    res.send('Tambah RPS');
});

router.put("/ubahrps", (req, res) =>             //mengubah RPS yang ada
{
    res.send("Ubah RPS");
});

router.put("/revisirps", (req, res) =>         //melakukan revisi RPS lama menjadi RPS versi berikutnya
{
    res.send("Revisi RPS");
});


//    ---CPMK---
router.get("/tambahcpmk", (req, res) =>         //menambahkan CPMK baru
{
    res.send("Tambah CPMK");
});

router.put("/ubahcpmk", (req, res) =>             //mengubah CPMK yang ada
{
    res.send("Ubah CPMK");
});

router.delete("/hapuscpmk", (req, res) =>         //menghapus CPMK mata kuliah
{
    res.send("Hapus CPMK");
});


//    ---REFERENSI---
router.get("/referensi", controller.referensi.retrieveAll); //lihat daftar referensi

router.get("/tambahreferensi", (req, res) =>         //menambahkan referensi baru
{
    res.send("Tambah Referensi");
});

router.put("/ubahreferensi", (req, res) =>             //mengubah referensi yang ada
{
    res.send("Ubah Referensi");
});

router.delete("/hapusreferensi", (req, res) =>         //menghapus referensi mata kuliah
{
    res.send("Hapus Referensi");
});


//    ---KOMPONEN PENILAIAN---
router.get("/tambahkomponen", (req, res) =>         //menambahkan komponen penilaian baru
{
    res.send("Tambah komponen");
});

router.put("/ubahkomponen", (req, res) =>             //mengubah komponen penilaian yang ada
{
    res.send("Ubah komponen");
});

router.delete("/hapuskomponen", (req, res) =>         //menghapus komponen penilaian
{
    res.send("Hapus komponen");
});


//    ---PERTEMUAN MINGGUAN---
router.get("/tambahpertemuan-mingguan", (req, res) =>         //menambahkan pertemuan mingguan
{
    res.send("Tambah Pertemuan Mingguan");
});

router.put("/ubahpertemuan-mingguan", (req, res) =>             //mengubah pertemuan mingguan yang ada dalam RPS
{
    res.send("Ubah Pertemuan Mingguan");
});

router.delete("/hapuspertemuan-mingguan", (req, res) =>         //menghapus pertemuan mingguan yang ada dalam RPS
{
    res.send("Hapus Pertemuan Mingguan");
});

module.exports = router;