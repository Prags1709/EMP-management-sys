const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require("../config/db")

const Leave = sequelize.define('leave', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  leave_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_date: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  end_date: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true
  },
  access_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
  } 
});

// synchronize the model with the database
sequelize.sync();

module.exports = {Leave};
