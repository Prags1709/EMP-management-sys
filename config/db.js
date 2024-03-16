const {Sequelize, DataTypes} = require('sequelize');

//connect to the sql server
//provided credentials to sql
const sequelize = new Sequelize('employee', 'root', 'Prags@1709', {
    host: 'localhost',
    dialect: 'mysql',
  });

  // const sequelize = new Sequelize('mysql://root:Prags@1709@localhost:3306');

  // sequelize.query('CREATE DATABASE application')
  // .then(() => {
  //   console.log('New database created.');
  // })
  // .catch((err) => {
  //   console.error(err);
  // })
  // .finally(() => {
  //   // Close the Sequelize connection
  //   sequelize.close();
  // });

  module.exports = {sequelize}