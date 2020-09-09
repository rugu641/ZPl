const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ruggu@123",
    database: "zpl",
    multipleStatements: true
});

mysqlConnection.connect(
    (err) =>{
        if(!err)
            console.log("Connection Successfull");
        else
            console.log(err);
    }
);

module.exports = mysqlConnection;
