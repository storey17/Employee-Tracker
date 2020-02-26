const inquirer = require('inquirer');
const mysql = require('mysql');
require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "company_db"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View departments",
                "View roles",
                "View employees",
                "Update employee role",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add department":
                    addDepartment();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "View departments":
                    viewDepartments();
                    break;

                case "View roles":
                    viewRoles();
                    break;

                case "View employees":
                    viewEmployees();
                    break;

                case "Update employee role":
                    updateEmployeeRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What department would you like to add?"
        })
        .then(function (answer) {
            var query = "INSERT INTO department SET ?";
            connection.query(query, { name: answer.department }, function (err, res) {
                if (err) throw err;
                console.log("Successfully added department!");
                runSearch();
            });
        });
};

function addRole() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        let stringDepartments = res.map(element => element.name);
        inquirer
            .prompt([{
                name: "title",
                type: "input",
                message: "What role title would you like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the role's salary?"
            },
            {
                name: "department",
                type: "list",
                message: "What is the role's department?",
                choices: stringDepartments
            }
            ])
            .then(function (answer) {
                var query = "INSERT INTO role SET ?";
                res.forEach(element => {
                    if (element.name === answer.department) { answer.department = element.id }
                });
                connection.query(query, { title: answer.title, salary: answer.salary, department_id: answer.department }, function (err, res) {
                    if (err) throw err;
                    console.log("Successfully added role!");
                    runSearch();
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    });
};

function addEmployee() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        let stringDepartments = res.map(element => element.name);
        inquirer
            .prompt([{
                name: "firstName",
                type: "input",
                message: "What is the first name of the employee?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name of the employee?"
            },
            {
                name: "role",
                type: "input",
                message: "What is the employee's role id?"
            },
            {
                name: "manager",
                type: "input",
                message: "What is the employee's manager id?"
            },
            {
                name: "department",
                type: "list",
                message: "What is the role's department?",
                choices: stringDepartments
            }
            ])
            .then(function (answer) {
                var query = "INSERT INTO employee SET ?";
                res.forEach(element => {
                    if (element.name === answer.department) { answer.department = element.id }
                });
                connection.query(query, { first_name: answer.firstName, last_name: answer.lastName, role_id: answer.role, manager_id: answer.manager, department_id: answer.department }, function (err, res) {
                    if (err) throw err;
                    console.log("Successfully added employee!");
                    runSearch();
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    });
};

function viewDepartments() {
    var query = "SELECT * from department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};

function viewRoles() {
    var query = "SELECT * from role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};

function viewEmployees() {
    var query = "SELECT * from employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};



