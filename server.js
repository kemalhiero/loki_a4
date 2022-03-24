const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const router = require("./Router/mahasiswa");

//route awal
app.get("/", (req, res) => {
    res.send("Welcome di Server JS");
  });
  
  //route untuk halaman login
 app.get("/login", (req, res) => {
    res.send("Ini adalah Halaman Login");
  });
