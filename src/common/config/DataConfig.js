require("dotenv").config();
const mysql = require("mysql2/promise");

const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_DATABASE;

const pool = mysql.createPool({
  // mysql 접속 설정
  host,
  port,
  user,
  password,
  database,
});

module.exports = pool;
