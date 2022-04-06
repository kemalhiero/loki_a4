const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbconfig");

sequelize.define('users', {

    id : {
        type : DataTypes.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement: true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false

    },
    email_verified_at : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    remember_token : {
        type : DataTypes.STRING
    },
    type : {
        type : DataTypes.ENUM('M','D','T'),
        allowNull : false,
    },
    created_at : {
        type : DataTypes.DATE
       
    },
    upadated_at : {
        type : DataTypes.DATE
        
    },

});