const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbconfig");


sequelize.define('course_requirements',
  {
    id:
    {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    course_id:
    {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    required_course_id:
    {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    required_level:
    {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    created_at:
    {
      type: DataTypes.DATE,
    },

    updated_at:
    {
      type: DataTypes.DATE,
    },

  });