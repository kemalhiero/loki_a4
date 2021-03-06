const model = require('../models/indexmodel');
const { Op, QueryTypes  } = require("sequelize");
const sequelize = model.dbconfig;
const controller = {};



controller.tambahMatkul = async function(req, res){

    const { kurikulum,  kodeMatkul, nama, alias, bobotSKS, semester, deskripsi } = req.body;

    const matkulExist = await model.courses.findOne({ 
        where:{[Op.or]: [{ code: req.body.kodeMatkul }, { name: req.body.nama }]} });
    if (matkulExist) return res.status(400).send('Mata Kuliah sudah ada');

    const kode = "JSI" + kodeMatkul

    try {
        await model.courses.create({
            curriculum_id: kurikulum,
            code: kode,
            name: nama,
            alias_name: alias,
            credit: bobotSKS,
            semester: semester,
            description: deskripsi
        });

        const id_course = await model.courses.findOne({where:{ code: kode }, attributes: ['id']})
        await model.course_plans.create({
            curriculum_id: kurikulum,
            course_id: id_course.id,
            rev: 0,
            code: kode,
            name: nama,
            alias_name: alias,
            credit: bobotSKS,
            semester: semester,
            description: deskripsi
        });
        res.redirect('back');
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

controller.tambahDosen = async function(req, res){

    const { id_rps,  id_dosen } = req.body;

    const dosenExist = await model.course_plan_lecturers.findOne({ 
        where:{[Op.and]: [{ course_plan_id: req.body.id_rps }, { lecturer_id: req.body.id_dosen }]} });
    if (dosenExist) return res.status(400).send('Dosen sudah ada');

    try {
        await model.course_plan_lecturers.create({
            course_plan_id: id_rps,
            lecturer_id: id_dosen,
            creator: 0
        });
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }

    
}

controller.hapusDosen = async function(req, res){

    const id = req.params.idhapus;

    try {
        await model.course_plan_lecturers.destroy({ where:{ id:id }
        });
        console.log("berhasil hapuss");
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }

    
}

// --------------untuk ditampilkan-------------

controller.tampilRpsAdmin = async function(req, res){
    const kurikulum = await model.curricula.findAll({attributes: ['id', 'name']});
    const matkul = await model.courses.findAll();
    res.render("rpsadmin", { kurikulum, matkul ,dasbordaktif: "", rpsaktif: "active" });
}

controller.tampilMenentukanDosen = async (req, res) => {

    const id = req.params.id;
  
    const matkul = await model.courses.findOne({ where: { id: id },attributes: ['name'] });
    const rps = await model.course_plans.findOne({where: { course_id: id },attributes:['id']});

    const dosenMatkul = await sequelize.query(
        'SELECT course_plan_lecturers.id, lecturers.name, lecturers.reg_id FROM lecturers LEFT JOIN course_plan_lecturers ON course_plan_lecturers.lecturer_id = lecturers.id WHERE course_plan_lecturers.course_plan_id= :idrps;',
        {
            replacements: { idrps: rps.id },
            type: QueryTypes.SELECT
        }
    );

    const dosen = await model.lecturers.findAll({ order: ['name'] ,attributes: ['id', 'name']});

    // res.send(dosenMatkul);
    res.render("menentukandosen", { dasbordaktif: "", rpsaktif: "active", dosen, matkul, rps, dosenMatkul });
  }

controller.tampilLaporanRpsMatkul = async function(req, res){

    const projectBase = await model.course_plan_details.count({ where:{ method:"Project Based" }});
    const caseBase = await model.course_plan_details.count({ where:{ method:"Cased Based" }});

    const cpmk = await model.course_los.findAll({attributes: [ 'id', 'code', 'name', 'type']});

    const rps = await model.course_plans.findAll({attributes:['id', 'rev', 'code', 'name', 'credit']});

    // res.json(caseBase)
    res.render("laporanrpsmatkul", { dasbordaktif: "", rpsaktif: "active", projectBase, caseBase, rps, cpmk });
}

controller.cetakLaporan = async function(req, res){

    const projectBase = await model.course_plan_details.count({ where:{ method:"Project Based" }});
    const caseBase = await model.course_plan_details.count({ where:{ method:"Cased Based" }});

    const cpmk = await model.course_los.findAll({attributes: [ 'id', 'code', 'name', 'type']})
    const rps = await model.course_plans.findAll({attributes:['id', 'rev', 'code', 'name', 'credit']});

    res.render("cetaklaporanrps", {cpmk, projectBase, caseBase, rps });
}



module.exports = controller;