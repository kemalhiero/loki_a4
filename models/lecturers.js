const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbconfig");

sequelize.define('lecturers' , {
    id:{
        type : DataTypes.BIGINT,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name:{
        type : DataTypes.STRING,
        allowNull : false
    },
    reg_id: {
        type : DataTypes.STRING,
        allowNull : false
    },
    phone : {
        type : DataTypes.STRING,
        allowNull : false
    },
    status :{
        type : DataTypes.INTEGER,
        allowNull : false
    },
    created_id : {
        type : DataTypes.DATE
    },
    updated_id : {
        type : DataTypes.DATE
    }
});