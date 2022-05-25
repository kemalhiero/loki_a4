// daftar controller
const indexcontroller = {};

const admin = require("./admin");
indexcontroller.admin = admin;

const cpmk = require("./cpmk");
indexcontroller.cpmk = cpmk;

const komp_penilaian = require("./komp_penilaian");
indexcontroller.komp_penilaian = komp_penilaian;

const lecturers = require("./lecturers");
indexcontroller.lecturers = lecturers;

const mahasiswa_dll = require("./mahasiswa_dll");
indexcontroller.mahasiswa_dll = mahasiswa_dll;

const pert_mingguan = require("./pert_mingguan");
indexcontroller.pert_mingguan = pert_mingguan;

const referensi = require("./referensi");
indexcontroller.referensi = referensi;

const rps = require("./rps");
indexcontroller.rps = rps;

const users = require("./users");
indexcontroller.users = users;

module.exports = indexcontroller;