const model = require("../models/users");
const controller = {};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(email) {
  return jwt.sign(email, process.env.TOKEN, { expiresIn: "1d" });
}

controller.retrieveAll = async function (req, res) {
  try {
    await model.findAll().then((result) => {
      if (result.length > 0) {
        res.status(200).json({
          message: "data user berhasil didapatkan",
          data: result,
        });
      } else {
        res.status(200).json({
          message: "data tidak ada",
          data: [],
        });
      }
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

controller.tampilregister = async function (req, res) {
  res.render("register");
}

controller.register = async function (req, res) {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const emailExist = await model.findOne({ where: { email: req.body.email } });
  if (emailExist) return res.status(400).send("Email sudah dipakai");

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
      type: role,
    });
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
  }

  //redirect ke halaman login
};

controller.tampillogin = async function (req, res) {
  const token = req.cookies.token;
  if (token) return res.redirect('/');
  
  res.render("auth-login");
}

controller.login = async function (req, res) {
  //Cek email
  const user = await model.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send("Email tidak ditemukan");

  //Cek Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password Salah");

  const nama = user.name;
  const email = user.email;
  const role = user.type;

  const token = generateAccessToken({ 
    email,nama,role
   });

  await model.update(
    { remember_token: token },
    {
      where: { email: req.body.email },
    }
  );

  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    // .json({token})
    .redirect("/");

};

controller.logout = async function (req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(200).json("Token tidak ada");
  const tokenDecoded = jwt.verify(token, process.env.TOKEN);
  const user = await model.findOne({
    where: {
      email: tokenDecoded.email,
    },
  });
  if (!user) return res.status(200).json("User tidak ada");
  const id = user.id;
  await model.update({ remember_token: null },
       { where: {id: id,},
    }
  );
  res
    .clearCookie("token")
    .redirect("/auth/login")
    // .locals = null;
    
  // res.sendStatus(200);

};

module.exports = controller;
