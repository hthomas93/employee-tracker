DROP database if exists employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    dept_id INT AUTO_INCREMENT NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(dept_id)
);

CREATE TABLE employee_role (
    role_id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary INT NULL,
    dept_id INT NULL,
    PRIMARY KEY(role_id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NULL,
	PRIMARY KEY(id)
);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Robert", "Frost", 32, 64);

INSERT INTO employee_role (role_id, title, salary, dept_id)
VALUES (32, "Boss", 500000, 10);

INSERT INTO department (dept_id, dept_name)
VALUES (10, "Management");

SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, employee_role.title, employee_role.salary, employee_role.dept_id
FROM employee 
INNER JOIN employee_role 
ON employee.role_id = employee_role.role_id;


