const express = require("express");
const router = express.Router();

// login sama logout
// dosen sama admin sama2 punya
router.get("/login", (req, res) => 
{
    res.send("Ini adalah Halaman Login Admin");
});

router.get("/logout", (req, res) => 
{
    res.send("Ini merupakan halaman logout Admin :V");
});


// admin doang
router.get("/menentukandosen", (req, res) =>       //menentukan dosen yang akan membuat/memperbaharui RPS
{
    res.send("menentukan dosen");
});

router.get("/lihat-laporan-rps", (req, res) =>         //melihat laporan terkait RPS yang ada
{
    let obj = 
    {
        "list-rps": ["rps ini", 
                     "rps itu"],
        "persentase-project-base": 40,
        "persentase-case-base": 60,
    }
    res.json(obj);
});

router.get("/cetaklaporan", (req, res) =>          //mencetak laporan terkait
{
    res.send("cetak laporan");
});

module.exports = router;