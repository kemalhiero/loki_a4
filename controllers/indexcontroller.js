// daftar controller
const indexcontroller = {};

indexcontroller.admin = require("./admin");
indexcontroller.mahasiswa = require("./mahasiswa");
indexcontroller.dosen = require("./dosen");
indexcontroller.users = require("./users");

module.exports = indexcontroller;