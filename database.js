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
            if (response.toAdd === "Departments") {
                inquirer
                    .prompt({
                        name: "deptname",
                        type: "prompt",
                        message: "What would you like to name the department?"
                    })
                    .then(function (answer) {
                        connection.query("INSERT INTO department SET ?", { dept_name: answer.deptname }, function (err) {
                            if (err) throw err;
                            console.log("New department added");
                            start();
                        },
                        )
                    })
            }
            else if (response.toAdd === "Roles") {
                // do this
                inquirer
                    .prompt([
                        {
                            name: "roletitle",
                            type: "prompt",
                            message: "What would you like to name the role?"
                        },
                        {
                            name: "salaryset",
                            type: "prompt",
                            message: "How much does this role pay?"
                        },
                        {
                            name: "deptid",
                            type: "prompt",
                            message: "What is this role's department ID?"
                        }
                    ])
                    .then(function (answer) {
                        connection.query("INSERT INTO employee_role SET ?",
                            [{ title: answer.roletitle },
                            { salary: parseInt(answer.salaryset) },
                            { dept_id: parseInt(answer.deptid) }
                            ],
                            function (err) {
                                if (err) throw err;
                                console.log("New role added");
                                start();
                            },
                        )
                    })
            }
            else if (response.toAdd === "Employees") {
                inquirer
                    .prompt([
                        {
                            name: "first",
                            type: "prompt",
                            message: "What is the employee's first name?"
                        },
                        {
                            name: "last",
                            type: "prompt",
                            message: "What is the employee's last name?"
                        },
                        {
                            name: "role",
                            type: "list",
                            message: "What is the employee's role?",
                            choices: [
                                // for each role in the database, populate the choices
                            ]
                        },
                        {
                            name: "manager",
                            type: "list",
                            message: "Who is the employee's manager?",
                            choices: [
                                // list all of the employees in the database
                            ]
                        }
                    ])
            }
        })
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