const Sequelize = require("sequelize");

const connection = new Sequelize("blog-with-cms", "root", "19372855", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
