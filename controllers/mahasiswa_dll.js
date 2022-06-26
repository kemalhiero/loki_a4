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
    const detailrpsmhs = await model.course_plans.findOne({where:{id} ,attributes: ['code', 'name', 'semester', 'credit', 'description']});
    res.render("detailrpsmhs", { rpsaktif: "active", detailrpsmhs });
}

// ---------DLL---------
controller.eksporRPS = async function(req, res){

}

module.exports = controller;