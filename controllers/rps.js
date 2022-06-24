const model = require('../models/indexmodel');
const controller = {};
const jwt = require('jsonwebtoken');
const { Op, QueryTypes  } = require("sequelize");
const sequelize = model.dbconfig;

//------------------DOSEN----------------
controller.rpsDosen = async function(req, res){

    const token = req.cookies.token
    if (!token) return res.status(200).send("tidak ada token")

    const nip = jwt.verify(token, process.env.TOKEN)

    const matkuldosen = await sequelize.query(
        'SELECT course_plans.code, course_plans.name, course_plans.credit, course_plans.rev, course_plans.semester, course_plans.id FROM course_plan_lecturers JOIN course_plans ON course_plan_lecturers.course_plan_id = course_plans.id JOIN lecturers ON course_plan_lecturers.lecturer_id = lecturers.id WHERE lecturers.reg_id= :nipDosen;',
        {
            replacements: { nipDosen: nip.email },
            type: QueryTypes.SELECT
        }
    );

    // res.send(matkuldosen)
    res.render("rpsdosen", { dasbordaktif: "", rpsaktif: "active", matkuldosen});
    
}

controller.tampilTambahRPS = async function(req, res){
    const id = req.params.id
    const rps = await model.course_plans.findOne({where:{id} ,attributes: ['code', 'name', 'semester', 'credit']});

    res.render("tambahrps", { dasbordaktif: "", rpsaktif: "active", rps });
}

controller.tampilUbahRPS = async function(req, res){
    const id = req.params.id
    const rps = await model.course_plans.findOne({where:{id} ,attributes: ['code', 'name', 'semester', 'credit']});

    res.render("ubahrps", { dasbordaktif: "", rpsaktif: "active", rps });
}

controller.tampilRevisiRPS = async function(req, res){
    const id = req.params.id
    const rps = await model.course_plans.findOne({where:{id} ,attributes: ['code', 'name', 'semester', 'credit']});

    res.render("revisirps", { dasbordaktif: "", rpsaktif: "active", rps });
}

controller.detailRPS = async function(req, res){
    const id = req.params.id
    const rps = await model.course_plans.findOne({where:{id} ,attributes: ['code', 'name', 'semester', 'credit','description']});

    res.render("detailrps", { dasbordaktif: "", rpsaktif: "active", rps });
}

// ---------------------🆖🆎----------------------------
controller.tambahRPS = async function(req, res){

    const { kodeMatkul, nama, alias, bobotSKS, semester, deskripsi, materiPembelajaran } = req.body;
    
    //cek apakah udah ada RPS untuk matkul yang bersangkutan
    const adaRPS = await model.findOne({ where:{course_id: req.body.email   } });
    if (!adaRPS) return res.status(400).send('RPS sudah ditambahkan');

    try {
        await model.create({
            // code: kodeMatkul,
            // name: nama,
            // alias_name: alias,
            // credit: bobotSKS,
            // semester: semester,
            // description: deskripsi,
            material: materiPembelajaran
        });
        res.json({msg: "Berhasil Menambahkan RPS"});
    } catch (error) {
        console.log(error);
    }
}

controller.ubahRPS = async function(req, res){

    const id = req.params.id;

    const { kodeMatkul, nama, alias, bobotSKS, semester, deskripsi, materiPembelajaran } = req.body;

    try {
        await model.update({
            // code: kodeMatkul,
            // name: nama,
            // alias_name: alias,
            // credit: bobotSKS,
            // semester: semester,
            // description: deskripsi,
            material: materiPembelajaran
        },{
            where : {id : id}
        });
        res.json({msg: "Berhasil Mengubah RPS"});
    } catch (error) {
        console.log(error);
    }
}

controller.revisiRPS = async function(req, res){

    //revisi pakai auto increment aja keknya 🤔
}

module.exports = controller;