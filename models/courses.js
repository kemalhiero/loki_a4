const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/loki")

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');   //tes koneksi
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
sequelize.define('courses' ,
{
    id:
    {
        type : DataTypes.BIGINT,
        allowNull: false,
        primaryKey : true,
        autoIncrement: true
    },

    curriculum_id:
    {
        type : DataTypes.BIGINT,
        allowNull: false,
        // foreignKey : curriculum_id
    },

    code:
    {
        type : DataTypes.STRING,
        allowNull: false 
    }, 

    name:
    {
        type : DataTypes.TEXT,
        allowNull: false 
    },

    alias_name:
    {
        type : DataTypes.TEXT
    },

    credit:
    {
        type : DataTypes.INTEGER,
        allowNull : false
    },

    semester:
    {
        type : DataTypes.INTEGER,
        allowNull : false
    },

    description:
    {
        type : DataTypes.TEXT
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