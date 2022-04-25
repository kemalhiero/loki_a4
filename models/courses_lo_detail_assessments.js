const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbconfig");

const course_lo_detail_assessments = sequelize.define('courses',
  {
    id:
    {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    course_plan_detail_id:
    {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    course_plan_assessment_id:
    {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    percentage:
    {
      type: DataTypes.DOUBLE,
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
  tableName: 'courses_lo_detail_assessments',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'

});

module.exports = courses_lo_detail_assessments;