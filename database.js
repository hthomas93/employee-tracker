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

var roles = [];
var employees = [];
var departments = ["Management", "Staff"];

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
                        departments.push(answer.deptname);
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
                            name: "dept",
                            type: "prompt",
                            message: "What is this role's department ID?"
                        }
                    ])
                    .then(function (answer) {
                        roles.push(answer.roletitle);
                        var query = connection.query("INSERT INTO employee_role (title, salary, dept_id) VALUES (?, ?, ?)", [answer.roletitle, answer.salaryset, answer.dept],
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
                            choices: roles
                        },
                        {
                            name: "manager",
                            type: "prompt",
                            message: "Who is the employee's manager?"
                        }
                    ])
                    .then(function (response) {
                        let name = "";
                        let fullname = name.concat(response.first + " " + response.last);
                        employees.push(fullname);
                        console.log(fullname);
                        start();
                    })
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
            if (response.toView === "Employees") {
                getAllEmployees();
            } else if (response.toView === "Roles") {
                getRoles();
            } else if (response.toView === "Departments") {
                getDepartments();
            }
        })
}

function update() {
    var query = 'SELECT employee_role.title FROM employee_role'
    console.log(roles);
    if (roles.length <= 0) {
        console.log("No roles to update!")
        start();
    } else {
        connection.query(query, function (err, res) {
            if (err) throw err;
            inquirer
                .prompt({
                    name: "toUpdate",
                    type: "list",
                    message: "Which employee roles would you like to update?",
                    choices: roles
                })
                .then(function () {
                    inquirer
                        .prompt({
                            type: "input",
                            name: "title",
                            message: "What name would you like to change the role to?"
                        })
                        .then(data => {
                            console.log("Updating" + data.toUpdate + "role...\n");
                            connection.query(
                                "INSERT INTO employee_role (title) VALUES (?)", data.title,
                                function (err, res) {
                                    if (err) throw err;
                                    console.log("role updated!\n")
                                    connection.query("SELECT * FROM roles", function (err, db_data) {
                                        console.table(db_data)
                                        updateInfo()
                                    })
                                })
                        });

                });
        })
    }
};





// This function will return all of the employees in a data table
function getAllEmployees() {
    var query =
        `SELECT 
        employee.id,
        employee.first_name, 
        employee.last_name, 
        employee_role.title, 
        department.dept_name, 
        employee_role.salary
    FROM 
        employee
    INNER JOIN 
        employee_role ON employee.role_id = employee_role.id OR employee.manager_id=employee_role.id
    INNER JOIN 
        department ON employee_role.dept_id = department.id
    ORDER BY
        employee.id
    ASC;`

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function getRoles() {
    var query = `SELECT * FROM employee_role`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function getDepartments() {
    var query = `SELECT * FROM department`;
    connection.query(query, function (err, res) {
        if (err) throw err;
    })
}