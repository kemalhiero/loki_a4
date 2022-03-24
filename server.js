const express = require('express');
const app = express()
const port = 3000


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


app.get("/print", (req, res) =>         //semua pengguna bisa menggunakannya
{
    res.send("Cetak RPS");
});

app.listen(port, () =>{
 console.log(`hdhjsfhj`)
});
