const { Pool } = require("pg");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const {
  DB_HOST: host,
  DB_PORT: port,
  DB_USERNAME: user,
  DB_PASSWORD: password,
  DB_DATABASE: database,
  SERVER_SQL_LOGGING: logging,
} = process.env;

// init database if not exists
(async () => {
  try {
    const pool = new Pool({
      host,
      port,
      user,
      password,
      database,
    });

    await pool.connect(async (err) => {
      if (err) {
        try {
          const poolWithoutDatabase = new Pool({
            host,
            port,
            user,
            password,
          });

          await poolWithoutDatabase.query(`CREATE DATABASE ${database};`);
        } catch (error) {
          console.log(error);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
})();

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "postgres",
  logging: logging === "true",
});

const Food = require("./models/Food")(sequelize);

// sync database
(async () => {
  await sequelize.sync({ force: false, alter: true });
})();

module.exports = { sequelize, Food };
