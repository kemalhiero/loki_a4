const model = require('../models/indexmodel');
const { Op } = require("sequelize");
const controller = {};


controller.tambahMatkul = async function(req, res){

    const { kurikulum,  kodeMatkul, nama, alias, bobotSKS, semester, deskripsi } = req.body;

    const matkulExist = await model.courses.findOne({ 
        where:{[Op.or]: [{ code: req.body.kodeMatkul }, { name: req.body.nama }]} });
    if (matkulExist) return res.status(400).send('Mata Kuliah sudah ada');

    try {
        await model.courses.create({
            curriculum_id: kurikulum,
            code: kodeMatkul,
            name: nama,
            alias_name: alias,
            credit: bobotSKS,
            semester: semester,
            description: deskripsi
        });
        res.redirect('/admin/rps');
    } catch (error) {
        console.log(error);
    }

    
}

controller.editMatkul = async function(req, res){

    const { kodeMatkul, nama, alias, bobotSKS, semester, deskripsi, materiPembelajaran } = req.body;

    try {
        await model.update({
            code: kodeMatkul,
            name: nama,
            alias_name: alias,
            credit: bobotSKS,
            semester: semester,
            description: deskripsi,
            material: materiPembelajaran
        },{
            where : {id : id}
        });
        res.redirect('/admin/rps');
    } catch (error) {
        console.log(error);
    }
}

controller.tampilRpsAdmin = async function(req, res){
    const kurikulum = await model.curricula.findAll({attributes: ['id', 'name']});
    const matkul = await model.courses.findAll();
    const role = req.cookies.role;
    const nama = req.cookies.nama;
    res.render("rpsadmin", { role, nama, kurikulum, matkul ,dasbordaktif: "", rpsaktif: "active" });
}

controller.tampilLaporanRpsMatkul = async function(req, res){
    const role = req.cookies.role;
    const nama = req.cookies.nama;
    res.render("laporanrpsmatkul", { role: role, nama: nama, dasbordaktif: "", rpsaktif: "active" });
}

controller.tampilanPersentaseRPS = async function(req, res){
    const role = req.cookies.role;
    const nama = req.cookies.nama;
    res.render("persentaserps", { role: role, nama: nama, dasbordaktif: "", rpsaktif: "active" });
}

controller.cetakLaporan = async function(req, res){
    res.send("cetak laporan");
}



module.exports = controller;