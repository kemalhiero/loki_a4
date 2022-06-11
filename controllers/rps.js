const model = require('../models/course_plans');
const controller = {};

//-----------------ADMIN------------------
controller.tampilRpsAdmin = async function(req, res){
    const role = req.cookies.role;
    const nama = req.cookies.nama;
    res.render("rpsadmin", { role: role, nama: nama, dasbordaktif: "", rpsaktif: "active" });
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

//------------------DOSEN----------------
controller.rpsDosen = async function(req, res){
    const role = req.cookies.role;
    const nama = req.cookies.nama;
    res.render("rpsdosen", { role: role, nama: nama, dasbordaktif: "", rpsaktif: "active" });
}

controller.tampilTambahRPS = async function(req, res){
    const role = req.cookies.role;
    const nama = req.cookies.nama;
    res.render("tambahrps", { role: role, nama: nama, dasbordaktif: "", rpsaktif: "active" });
}

controller.detailRPS = async function(req, res){
    const role = req.cookies.role;
    const nama = req.cookies.nama;
    res.render("detailrps", { role: role, nama: nama, dasbordaktif: "", rpsaktif: "active" });
}

//------------------MAHASISWA--------------------
controller.rpsMahasiswa = async function(req, res){
    const role = req.cookies.role;
    const nama = req.cookies.nama;
    res.render("rpsmahasiswa", { role: role, nama: nama, rpsaktif: "active" });
}

controller.detailRPSMahasiswa = async function(req, res){
    const role = req.cookies.role;
    const nama = req.cookies.nama;
    res.render("detailrpsmhs", { role: role, nama: nama, rpsaktif: "active" });
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