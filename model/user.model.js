const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require("../config/db")

const User = sequelize.define("user",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name:{
        type:DataTypes.STRING(32),//varchar(32)
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(32),
        allowNull:true,
        unique:true
    },
    password:{
        type:DataTypes.STRING(64),
        allowNull:true,
    },
    role: {
        type:DataTypes.ENUM("manager",
        "employee"),
        allowNull:false
    }

})

module.exports = {User}