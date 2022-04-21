const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbconfig");
  
const course_plan_assessments = sequelize.define('course_plan_assessments' ,
{
    id:
    {
        type : DataTypes.BIGINT,
        allowNull: false,
        primaryKey : true,
        autoIncrement: true
    },

    course_plan_id:
    {
        type : DataTypes.BIGINT,
        allowNull: false
    },

    name:
    {
        type : DataTypes.STRING,
        allowNull: false 
    }, 

    percentage:
    {
        type : DataTypes.DOUBLE,
        allowNull: false 
    },

    flag:
    {
        type : DataTypes.INTEGER,
        allowNull: false
    },

    created_at:
    {
        type : DataTypes.DATE,
    },

    updated_at:
    {
        type : DataTypes.DATE,

    }
    }, 
    
    {
    tableName: 'course_plan_assessments',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'

});

module.exports = course_plan_assessments;