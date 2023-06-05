const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres://postgres:postgres@postgresdb/august", {
//  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
//  port: dbConfig.port,
  operatorsAliases: false,
  define: {
    timestamps: true
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.senses = require("./sense.model.js")(sequelize, Sequelize);
db.types = require("./type.model.js")(sequelize, Sequelize);

module.exports = db;