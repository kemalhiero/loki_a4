const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const router = require("./Router/mahasiswa");

app.get("/", (req, res) => 
{
    res.send("Welcome di Server JS");
});
  
app.get("/login", (req, res) => 
{
    res.send("Ini adalah Halaman Login");
});

app.get("/logout", (req, res) => 
{
    res.send("Ini merupakan halaman logout :)");
});
  
app.get("/daftarrps", (req, res) => 
{
    res.send("Daftar RPS");
});

app.get("/print", (req, res) => 
{
    res.send("Cetak RPS");
});

app.get("/lihatrps", (req, res) => 
{
    res.send("RPS dapat dilihat di sini");
});
