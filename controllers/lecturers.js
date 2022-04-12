const model = require('../models/lecturers');
const controller = {};

controller.retrieveAll = async function(req, res){
    try{
        await model.findAll().then((result) => {
            if(result.length > 0){
                res.status(200).json({
                    message: 'data dosen berhasil didapatkan',
                    data: result
                })
            }else{
                res.status(200).json({
                    message: 'data tidak ada',
                    data: []
                })
            }
        })
    }catch(error){
        res.status(404).json({
            message: error,
        })
    }
}

module.exports = controller;