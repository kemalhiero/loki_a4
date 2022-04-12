const express = require('express');
const app = express()
const port = 3000
const controller = require(`./controllers/indexcontroller`);

//router
const mahasiswa = require("./Router/mahasiswa");
app.use('/mahasiswa',mahasiswa)

const dosen = require("./Router/dosen");
app.use('/dosen',dosen)

const admin = require("./Router/admin");
app.use('/admin',admin)


//--------------------------------
app.get("/", (req, res) => 
{
    res.send("Welcome to Server JS Kelompok 4");
});

//lihat daftar user
app.get("/user", controller.users.retrieveAll);

app.get("/print", (req, res) =>         //semua pengguna bisa menggunakannya
{
    res.send("Cetak RPS");
});


app.use('/', (req, res) => {
    res.send('Salah alamat');
});

app.listen(port, () =>{
 console.log(`Server Sedang Berjalan di port ${port}`)
});
