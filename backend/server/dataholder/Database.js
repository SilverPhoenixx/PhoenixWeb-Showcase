const mysql = require("mysql2");

/* Datenbank */
class Database {

constructor() {
    this.connection = mysql.createConnection({host: "Host", user: "Username", password: "Password", database: "Database", port: '3306'})
} 

/* Verbindungsaufbau zur Datenbank */
connect() {
    this.connection.connect(function(err) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

getConnection() {

    return this.connection;
}
}
module.exports =  Database;
