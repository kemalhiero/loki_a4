const model = require('../models/courses');
const controller = {};


controller.tambahMatkul = async function(req, res){

    const { kodeMatkul, nama, alias, bobotSKS, semester, deskripsi } = req.body;

    const matkulExist = await model.findOne({ 
        where:{[Op.or]: [{ code: req.body.kodeMatkul }, { name: req.body.nama }]} });
    if (matkulExist) return res.status(400).send('Mata Kuliah sudah ada');

    try {
        await model.create({
            code: kodeMatkul,
            name: nama,
            alias_name: alias,
            credit: bobotSKS,
            semester: semester,
            description: deskripsi
        });
        res.json({msg: "Berhasil Menambahkan RPS"});
    } catch (error) {
        console.log(error);
    }

}

controller.editMatkul = async function(req, res){

    const id = req.params.id;

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
        res.json({msg: "Berhasil Mengubah RPS"});
    } catch (error) {
        console.log(error);
    }
}

controller.get_menentukanDosen = async function(req, res){

}

controller.post_menentukanDosen = async function(req, res){

}

controller.laporanRPS = async function(req, res){

}

controller.cetakLaporan = async function(req, res){

}



module.exports = controller;