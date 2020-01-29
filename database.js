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
    start();
});

function start() {
    inquirer
        .prompt({
            name: "menuChoice",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add", "View", "Update", "Exit"]
        })
        .then(function (response) {
            if (response.menuChoice === "Add") {
                add();
            }
            else if (response.menuChoice === "View") {
                view();
            }
            else if (response.menuChoice === "Update") {
                update();
            }
            else if (response.menuChoice === "Exit") {
                console.log("See you later!");
                connection.end();
            }
        })
}

function add() {
    inquirer
        .prompt({
            name: "toAdd",
            type: "list",
            message: "What would you like to add?",
            choices: ["Departments", "Roles", "Employees"]
        })
        .then(function (response) {
            console.log(response.toAdd)
            start();
        })
    // Add departments, roles, employees
}

function view() {
    inquirer
        .prompt({
            name: "toView",
            type: "list",
            message: "What would you like to view?",
            choices: ["Departments", "Roles", "Employees"]
        })
        .then(function (response) {
            console.log(response.toView)
            start();
        })
    // View departments, roles, employees
}

function update() {
    console.log("Time to update!");
    start();
}