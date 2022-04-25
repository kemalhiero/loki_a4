const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbconfig");

const course_lo_detail_refs = sequelize.define('courses',
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

    course_plan_reference_id:
    {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    category:
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
    }

  }, {
  tableName: 'courses_lo_detail_refs',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'

});

module.exports = courses_lo_detail_refs;