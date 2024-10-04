// lib/db.js
import mysql from "mysql2/promise";

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatapp_admin_user",
});

export default database;
