const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);
const authenticateToken = require(`../middleware/authToken`);

router.set('view engine', 'ejs');
router.use( express.static( "views" ) );

router.get("/rps", (req, res) =>
{
    res.render('rpsadmin');
});

router.get("/menentukandosen", (req, res) =>       //menentukan dosen yang akan membuat/memperbaharui RPS
{
    res.render('menentukandosen');
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