// daftar controller
const indexcontroller = {};

const users = require("./users");
indexcontroller.users = users;

const lecturers = require("./lecturers");
indexcontroller.lecturers = lecturers;

const referensi = require("./course_plan_references");
indexcontroller.course_plan_references = referensi;



module.exports = indexcontroller;