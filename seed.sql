DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;


CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary INT,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);


INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id) 
VALUES
("Storey", "Sheldon", 1, null, 1),
("Ryan", "Whitcomb", 2, 1, 2),
("Francisco", "Cortez", 3, 1, 3),
("Stefania", "S", 4, 1, 4),
("Mason", "Scott", 5, 4, 5);

INSERT INTO role (title, salary, department_id) 
VALUES
("CEO", 200000, 1),
("CFO", 150000, 2),
("CMO", 100000, 3),
("CTO", 150000, 4),
("IT", 50000, 5);

INSERT INTO department (name) 
VALUES
("Head Office"),
("Finance"),
("Marketing"),
("Technology"),
("IT");