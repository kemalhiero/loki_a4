const model = require('../models/indexmodel');
const { Op, QueryTypes  } = require("sequelize");
const controller = {};

//----mahasiswa----
controller.rpsMahasiswa = async function(req, res){

    const rpsmhs = await model.course_plans.findAll({where:{rev:{[Op.gte]: 0}}, attributes: ['id','code', 'name', 'semester', 'credit']});

    res.render("rpsmahasiswa", { rpsaktif: "active", rpsmhs });
}

controller.detailRPSMahasiswa = async function(req, res){
    const id = req.params.id;
    const rps = await model.course_plans.findOne({where:{id} ,attributes: ['id', 'code', 'name', 'semester', 'credit', 'description']});

    const cpps = await model.curriculum_los.findAll({attributes: [ 'id', 'code', 'name', 'type']});
    const referensi = await model.course_plan_references.findAll({where:{course_plan_id : id} ,attributes: [ 'id', 'title', 'author', 'publisher', 'year', 'description']});
    const pertMgg = await model.course_plan_details.findAll({where:{course_plan_id : id} ,attributes: [ 'id', 'week', 'material', 'method', 'student_experience']});
    const kompPenilaian = await model.course_plan_assessments.findAll({where:{course_plan_id : id} ,attributes: [ 'id', 'name', 'percentage']});
    const cpmk = await model.course_los.findAll({where:{course_plan_id : id} ,attributes: [ 'id', 'code', 'name', 'type']});
    
    res.render("detailrpsmhs", { rpsaktif: "active", rps, cpps , referensi, pertMgg, kompPenilaian, cpmk });
}


controller.eksporRPS = async function(req,res){
    const id = req.params.id;
    const rps = await model.course_plans.findOne({where:{id} ,attributes: ['code', 'name', 'semester', 'credit', 'description']});

    const cpps = await model.curriculum_los.findAll({attributes: [ 'id', 'code', 'name', 'type']});
    const referensiUtama = await model.course_plan_references.findAll({where:{course_plan_id : id, description:"Utama"} ,attributes: [ 'id', 'title', 'author', 'publisher', 'year', 'description']});
    const referensiPendukung = await model.course_plan_references.findAll({where:{course_plan_id : id, description:"Pendukung"} ,attributes: [ 'id', 'title', 'author', 'publisher', 'year', 'description']});
    const pertMgg = await model.course_plan_details.findAll({where:{course_plan_id : id} ,attributes: [ 'id', 'week', 'material', 'method', 'student_experience']});
    const kompPenilaian = await model.course_plan_assessments.findAll({where:{course_plan_id : id} ,attributes: [ 'id', 'name', 'percentage']});
    const cpmk = await model.course_los.findAll({where:{course_plan_id : id} ,attributes: [ 'id', 'code', 'name', 'type']});

    const rowspanCPMK = await model.course_los.count('code',{ where:{ course_plan_id : id}}); 
    const rowspanCPL = await model.curriculum_los.count('id');
    
    const rowspan = parseInt(rowspanCPL) + parseInt(rowspanCPMK);

    // res.json(rowspan)
    res.render("RPS", { rps, cpps , referensiUtama, referensiPendukung, pertMgg, kompPenilaian, cpmk, rowspan });
}

module.exports = controller;