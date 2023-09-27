import dotenv from "dotenv";
dotenv.config();

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) console.log(err);
  console.log("Connected to the database");
});

module.exports = db;
