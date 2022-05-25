const model = require('../models/course_plans');
const controller = {};

controller.listRPS = async function(req, res){

}

controller.detailRPS = async function(req, res){

}

controller.tambahRPS = async function(req, res){

    const { kodeMatkul, nama, alias, bobotSKS, semester, deskripsi, materiPembelajaran } = req.body;
    //revisi pakai auto increment aja keknya 🤔
    
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