const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const router = require("./router/mahasiswa");

app.use(router);

app.listen(port, () =>{
    console.log(`example app listening on port ${port}`)
});
