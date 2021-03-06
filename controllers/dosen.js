const model = require('../models/indexmodel');
const controller = {};
const jwt = require('jsonwebtoken');
const { Op, QueryTypes  } = require("sequelize");
const sequelize = model.dbconfig;

//------------------Tampil RPS DOSEN----------------
controller.rpsDosen = async function(req, res){

    const token = req.cookies.token
    if (!token) return res.status(200).send("tidak ada token")

    const nip = jwt.verify(token, process.env.TOKEN)

    const matkuldosen = await sequelize.query(
        'SELECT course_plans.code, course_plans.name, course_plans.credit, course_plans.rev, course_plans.semester, course_plans.id, course_plans.created_by FROM course_plan_lecturers JOIN course_plans ON course_plan_lecturers.course_plan_id = course_plans.id JOIN lecturers ON course_plan_lecturers.lecturer_id = lecturers.id WHERE lecturers.reg_id= :nipDosen;',
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
    const rps = await model.course_plans.findOne({where:{id} ,attributes: [ 'id', 'code', 'name', 'semester', 'credit']});
    
    const cpps = await model.curriculum_los.findAll({attributes: [ 'id', 'code', 'name', 'type']});
    const cpmk = await model.course_los.findAll({where:{course_plan_id : id} ,attributes: [ 'id', 'code', 'name', 'type']});
    const referensi = await model.course_plan_references.findAll({where:{course_plan_id : id} ,attributes: [ 'id', 'title', 'author', 'publisher', 'year', 'description']});
    const pertMgg = await model.course_plan_details.findAll({where:{course_plan_id : id} ,attributes: [ 'id', 'week', 'material', 'method', 'student_experience']});
    const kompPenilaian = await model.course_plan_assessments.findAll({where:{course_plan_id : id} ,attributes: [ 'id', 'name', 'percentage']});

    // const cpmk = await sequelize.query(
    //     'SELECT course_lo_details.id AS iddetail, course_los.code AS kodecpmk, course_los.id, course_los.name, curriculum_los.code AS kodecpl FROM course_lo_details JOIN course_los ON course_lo_details.course_lo_id = course_los.id JOIN curriculum_los ON course_lo_details.curriculum_lo_id = curriculum_los.id WHERE course_los.course_plan_id= :idrps;',
    //     {
    //         replacements: { idrps: id },
    //         type: QueryTypes.SELECT
    //     }
    // );

    // res.send(cpmk)
    res.render("tambahrps", { dasbordaktif: "", rpsaktif: "active", rps, cpps, cpmk, referensi, pertMgg, kompPenilaian });
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

// ---------------------????????----------------------------
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

    //revisi pakai auto increment aja keknya ????
}

// ------------REFERENSI------------

controller.tambahReferensi = async function(req, res){

    const { course_plan_id, title, author, publisher, year, description } = req.body;

    const referensiExist = await model.course_plan_references.findOne({ 
        where:{[Op.and]: [{title}, {author}, {publisher}] }});
    if (referensiExist) return res.status(400).send('Referensi sudah ada');

    try {
        await model.course_plan_references.create({
            course_plan_id,
            title,
            author,
            publisher,
            year,
            description
        });
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

controller.ubahReferensi = async function(req, res){

    const { id, title, author, publisher, year, description } = req.body;

    try {
        await model.course_plan_references.update({
            title,
            author,
            publisher,
            year,
            description
        }
            ,{ where:{ id }
        });
        console.log("berhasil ubah referensi");
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }

}

controller.hapusReferensi = async function(req, res){

    const id = req.params.idhapus;

    try {
        await model.course_plan_references.destroy({ where:{ id }
        });
        console.log("berhasil hapuss referensi");
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }

}
// ------------Pertemuan Mingguan------------

controller.tambahPertMingguan = async function(req, res){

    const { course_plan_id, week, material, method, student_experience } = req.body;

    const weekExist = await model.course_plan_details.findOne({ where:{[Op.and]: [{week}, {course_plan_id}]} });
    if (weekExist) return res.status(400).send('Pertemuan sudah ada');

    try {
        await model.course_plan_details.create({
            course_plan_id,
            week,
            material,
            method,
            student_experience
        });
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

controller.ubahPertMingguan = async function(req, res){

    const { id, week, material, method, student_experience } = req.body;

    try {
        await model.course_plan_details.update({
            week,
            material,
            method,
            student_experience
        }
            ,{ where:{ id }});
        console.log("berhasil ubah pertemuan mingguan");
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }

}

controller.hapusPertMingguan = async function(req, res){

    const id = req.params.idhapus;

    try {
        await model.course_plan_details.destroy({ where:{ id }
        });
        console.log("berhasil hapuss pertemuan mingguan");
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }

}


// ------------KOMPONEN PENILAIAN------------

controller.tambahKompPenilaian = async function(req, res){

    const { course_plan_id, name, percentage } = req.body;

    const komponenExist = await model.course_plan_assessments.findOne({ where:{[Op.and]: [{name}, {course_plan_id}]} });
    if (komponenExist) return res.status(400).send('Komponen penilaian sudah ada');

    const totalKompPenilaian = await model.course_plan_assessments.sum('percentage',{ where:{ course_plan_id }});
    if (totalKompPenilaian+parseInt(percentage)>100) return res.status(400).send('Total bobot melebihi batas maksimum');

    try {
        await model.course_plan_assessments.create({
            course_plan_id,
            name,
            percentage,
            flag:0
        });
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

controller.ubahKompPenilaian = async function(req, res){

    const { id, persentaseLama, course_plan_id, name, percentage } = req.body;

    const totalKompPenilaian = await model.course_plan_assessments.sum('percentage',{ where:{ course_plan_id }});
    if (totalKompPenilaian-parseInt(persentaseLama)+parseInt(percentage)>100) return res.status(400).send('Total bobot melebihi batas maksimum');

    try {
        await model.course_plan_assessments.update({
            name,
            percentage
        }
            ,{ where:{ id }});
        console.log("berhasil ubah komponen penilaian");
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }

}

controller.hapusKompPenilaian = async function(req, res){

    const id = req.params.idhapus;

    try {
        await model.course_plan_assessments.destroy({ where:{ id }
        });
        console.log("berhasil hapuss komponen penilaian");
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }

}

// ------------CPMK------------

controller.tambahCPMK = async function(req, res){

    const { course_plan_id, cpl, name, code } = req.body;

    const cpmkExist = await model.course_los.findOne({ where:{[Op.and]: [{code}, {course_plan_id}]} });
    if (cpmkExist) return res.status(400).send('CPMK sudah ada');

    try {
        await model.course_los.create({
            course_plan_id,
            name,
            code,
            parent_id:1,
            type:1
        });

        // const idcpmk = await model.course_los.findOne({where:{ code }, attributes: ['id']})

        // await model.course_lo_details.create({
        //     course_lo_id: idcpmk.id,
        //     curriculum_lo_id: cpl
        // });

        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

controller.ubahCPMK = async function(req, res){

    const { id, name, code, idcpl } = req.body;

    try {
        await model.course_los.update({
            name,
            code
        },{ 
            where:{ id }
        });

        // const idcpmk = await model.course_los.findOne({where:{ code }, attributes: ['id']})

        // await model.course_lo_details.update({
        //     course_lo_id: idcpmk.id,
        //     curriculum_lo_id: idcpl
        // });

        console.log("berhasil ubah CPMK");
        res.redirect('back');

        res.send(idcpmk)
    } catch (error) {
        console.log(error);
    }
}

controller.hapusCPMK = async function(req, res){

    const id = req.params.idhapus;

    try {
        await model.course_los.destroy({ where:{ id }});

        console.log("berhasil hapuss CPMK");
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

module.exports = controller;