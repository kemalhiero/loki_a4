const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);
const authenticateToken = require(`../middleware/authToken`);

app.set('view engine', 'ejs');
app.use( express.static( "views" ) );

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