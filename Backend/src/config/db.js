const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbUrl = process.env.DB_URL || 'postgres://admin:password@localhost:5432/ecommerce';

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
