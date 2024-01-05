import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "./config/mysql.config.js";

class MySQLConnection {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new MySQLConnection();
    }
    return this.instance;
  }

  connection;

  constructor() {
    this.connect();
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection(MYSQL_CONFIG);
      console.log("Connected to MySQL");
    } catch (err) {
      console.error("Error connecting to MySQL:", err);
    }
  }
}

export const mysqlConnection = MySQLConnection.getInstance();
