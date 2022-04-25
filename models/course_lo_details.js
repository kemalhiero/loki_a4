const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbconfig");

const course_lo_details = sequelize.define('courses',
  {
    id:
    {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    curriculum_lo_id:
    {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    course_lo_id:
    {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    created_at:
    {
      type: DataTypes.DATE,
    },

    updated_at:
    {
      type: DataTypes.DATE,
    }

  }, {
  tableName: 'courses_lo_details',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'

});

module.exports = courses_lo_details;