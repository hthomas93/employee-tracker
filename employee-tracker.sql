DROP database if exists employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee_role (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
	PRIMARY KEY(id)
);

INSERT INTO employee (id,first_name, last_name, role_id, manager_id)
VALUES (1,"Robert", "Frost", 32, 64);

INSERT INTO employee_role (id, title, salary, department_id)
VALUES (1, "Boss", 500000, 10);

INSERT INTO department (id, name)
VALUES (1, "Management");

SELECT * FROM employee;
SELECT * FROM employee_role;
SELECT * FROM department;

