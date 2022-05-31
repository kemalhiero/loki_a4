const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);
const authenticateToken = require(`../middleware/authToken`);

router.set('view engine', 'ejs');
router.use( express.static( "views" ) );

//route mengubah/membuat RPS yang sudah ada didalam Web
router.get("/lihatdetailrps", (req, res) => {
  let obj = 
  {
      "message": "Data diubah oleh Dosen",
      "Nama": "Doraemon",
      "Kode Matakuliah": "ST12",
      "Mata kuliah ": "Dasar Program",
      "RPS": "(Isi RPS)",
      "Ket": "BERHASIL",
      "code": 200
  }
  res.json(obj);
});


router.get("/caridirps", (req, res) => 
{
    res.send("Ni halaman cari RPS");
});

module.exports = router;