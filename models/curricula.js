const { Sequelize, DataTypes} = require('sequelize');
const sequelize = require("./dbconfig");

sequelize.define('curricula', {

  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey : true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  active: {
    type: DataTypes.STRING,
    allowNull: false

  },
  year_start: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  year_end: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE
  },
  update_at: {
    type: DataTypes.DATE
  },
 
});