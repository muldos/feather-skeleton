module.exports = {
  target: "node14",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [
    "pg",
    "sqlite3",
    "tedious",
    "mariadb",
    "pg-hstore",
    "cardinal", //remove warning and errors around sequelize and mysql2 optionnal deps
  ],
};
