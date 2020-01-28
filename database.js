require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "employee_tracker_db",
    password: process.env.DB_PASSWORD
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadID);
});

