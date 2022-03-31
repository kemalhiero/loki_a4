const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/loki")

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');   //tes koneksi
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

sequelize.define('course_plan_references' ,
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

    title:
    {
        type : DataTypes.STRING,
        allowNull: false 
    }, 

    author:
    {
        type : DataTypes.STRING,
        allowNull: false 
    },

    publisher:
    {
        type : DataTypes.STRING,
        allowNull: false 
    },

    year:
    {
        type : DataTypes.INTEGER,
        allowNull : false
    },

    description:
    {
        type : DataTypes.TEXT,
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

});