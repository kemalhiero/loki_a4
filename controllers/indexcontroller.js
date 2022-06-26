// daftar controller
const indexcontroller = {};

indexcontroller.admin = require("./admin");
indexcontroller.mahasiswa_dll = require("./mahasiswa_dll");
indexcontroller.dosen = require("./dosen");
indexcontroller.users = require("./users");

module.exports = indexcontroller;