import mysql from 'mysql2'

/* Datenbank */
class Database {

constructor() {
    this.connection = mysql.createPool({host: "EXAMPLE", user: "EXAMPLE", password: "EXAMPLE", database: "EXAMPLE", port: '3306'})
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
export default Database;
