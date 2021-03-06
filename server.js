const express = require("express");
const app = express();
const port = 3000;
const controller = require(`./controllers/indexcontroller`);
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config();

const { isDosen, isAdmin , checkUser } = require(`./middleware/authToken`);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("*", checkUser);

//router
const mahasiswa = require("./Router/mahasiswa");
app.use("/mahasiswa", mahasiswa);

const dosen = require("./Router/dosen");
app.use("/dosen", isDosen, dosen);

const admin = require("./Router/admin");
app.use("/admin", isAdmin, admin);

const auth = require("./Router/auth");
app.use("/auth", auth);

//--------------------------------

app.get("/", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect('/mahasiswa/rps')
  } else{
    res.render("index", { dasbordaktif: "active", rpsaktif: "" });
  }
 
});

//lihat daftar user
app.get("/user", controller.users.retrieveAll);

app.get("/profil",(req,res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/auth/login')
  
  res.render("profil", { dasbordaktif: "", rpsaktif: "" });
});


app.get("/500",(req,res) => {
    res.render("eror500");
  });

//----------------------------------
app.use("/", (req, res) => {
  res.render("eror404");
});

app.listen(port, () => {
  console.log(`Server Sedang Berjalan di http://localhost:${port}`);
});
