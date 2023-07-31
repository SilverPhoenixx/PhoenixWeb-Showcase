import mysql from 'mysql2'

/* Datenbank */
class Database {

constructor() {
    this.connection = mysql.createPool({host: "seraphimbuildings.de", user: "RPG", password: ".6esnKtS\"PMA!J4C(aYX", database: "PhoenixData", port: '3306'})
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
