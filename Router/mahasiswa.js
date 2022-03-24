const express = require("express");
const router = express.Router();

//route mengubah/membuat RPS yang sudah ada didalam Web
router.post("inirps", (req, res) => {
  console.log("UBAH DATA RPS");
  let obj = 
  {
      "message": "Data diubah oleh Dosen",
      "Nama": "Doraemon S. Kom",
      "Kode Matakuliah": "SIJJ3402",
      "Mata kuliah ": "Dasar Program",
      "RPS": "(Isi RPS)",
      "Ket": "BERHASIL",
      "code": 200
  }
  res.json(obj);
  console.log("\n\nRPS berhasil di Update");
});


module.exports = router;