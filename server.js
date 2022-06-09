const express = require("express");
const app = express();
const port = 3000;
const controller = require(`./controllers/indexcontroller`);
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static("views"));

//router
const mahasiswa = require("./Router/mahasiswa");
app.use("/mahasiswa", mahasiswa);

const dosen = require("./Router/dosen");
app.use("/dosen", dosen);

const admin = require("./Router/admin");
app.use("/admin", admin);

const auth = require("./Router/auth");
app.use("/auth", auth);

//--------------------------------
app.get("/", (req, res) => {
  const role = req.cookies.role;
  const nama = req.cookies.nama;
  if (role=="T"||role=="D") {
    res.render("index", { role: role, nama: nama, dasbordaktif: "active", rpsaktif: "" });
  } else {
    res.redirect('/mahasiswa/rps')
  }
 
});

//lihat daftar user
app.get("/user", controller.users.retrieveAll);

app.get("/print",(req,res) => {
    res.send("Cetak RPS");
  });

//----------------------------------
app.use("/", (req, res) => {
  res.render("eror404");
});

app.listen(port, () => {
  console.log(`Server Sedang Berjalan di http://localhost:${port}`);
});
