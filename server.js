const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const router = require("./Router/mahasiswa");

//route awal
x.get("/", (req, res) => {
    res.send("Welcome di Server JS");
  });
  
  //route untuk halaman login
  x.get("/login", (req, res) => {
    res.send("Ini adalah Halaman Login");
  });
