const model = require('../models/users');
const controller = {};
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN, { expiresIn: '1800s' });
  }

controller.retrieveAll = async function(req, res){
    try{
        await model.findAll().then((result) => {
            if(result.length > 0){
                res.status(200).json({
                    message: 'data user berhasil didapatkan',
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

controller.register = async function(req, res){
    const { name, email, password, confPassword, role } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // let obj = 
    // {
    //     nama: name,
    //     surel: email,
    //     garam: salt,
    //     hasss: hashPassword
    //     type: role
    // }
    // res.json(obj);

    try {
        await model.create({
            name: name,
            email: email,
            password: hashPassword,
            type: role
        });
        res.json({msg: "Register Berhasil"});
    } catch (error) {
        console.log(error);
    }
}

controller.login = async function(req, res){

     //ambil data yg dikirim user
     let username = req.body.username;
     let password = req.body.password;
 
     //cek username dan user di database
 
 
     //jika ada, generate token dan kirimkan ke user
     const token = generateAccessToken({username});
 
     let json = {
         user:username,
         token:token,
         pesan:'Suksessss!!'
     }
 
     return res.json(json);
 
     //jika username/password tidak cocok, kirimkan pesan gagal
}

controller.logout = async function(req, res){
    res.send("Udah logout!!");
}

module.exports = controller;