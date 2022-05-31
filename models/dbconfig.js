const { Sequelize } = require('sequelize');

const dbconfig = new Sequelize('loki', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
  });

  try {
    dbconfig.authenticate();
    console.log('Connection has been established successfully.');   //tes koneksi
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

module.exports = dbconfig;