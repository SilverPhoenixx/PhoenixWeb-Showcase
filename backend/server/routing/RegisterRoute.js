
const AbstractRoute = require('./AbstractRoute');
class RegisterRoute extends AbstractRoute {

initialize() {
    this.getApp().post('/register', this.middlewareData, async function(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let username = req.body.username;
    
        //Abfrage ob die Daten übermittelt wurden
        if (!(email || password || username)) {
            req.data = {"State": "400", "Message": "Incorrect Email, Password, Username"};
            req.server.getNuxt().renderRoute("/register", {req})
            .then(result => {
                res.status(404).send(result.html);
            }).catch(err => console.log(err));
            return;
        }
    
        //Passwort länge muss mind. 8 Zeichen betragen
        if(password.length < 8) {
            req.data = {"State": "400", "Message": "Das Passwort ist zu kurz. (mind. 8 Zeichen)"};
            req.server.getNuxt().renderRoute("/register", {req})
            .then(result => {
                res.status(404).send(result.html);
            }).catch(err => console.log(err));
            return
        }
    
        //Abfrage ob die Registrierungsemail bereits existiert
        let [rows, fields]= await req.server.getDatabase().getConnection().promise().query('SELECT * FROM PhoenixWeb WHERE Email = ?', [email]);
        if(rows.length > 0) {
            req.data = {"State": "400", "Message": "Ein Benutzer mit der Email besteht bereits."};
            req.server.getNuxt().renderRoute("/register", {req})
            .then(result => {
                res.status(404).send(result.html);
            }).catch(err => console.log(err));
            return
        }

        //Abfrage ob die Registrierungsemail bereits existiert
        let [rowsUsername, fieldsUsername]= await req.server.getDatabase().getConnection().promise().query('SELECT * FROM PhoenixWeb WHERE Username = ?', [username]);
        if(rowsUsername.length > 0) {
            req.data = {"State": "404","Message": "Ein Benutzer mit dem Benutzernamen besteht bereits."};
            req.server.getNuxt().renderRoute("/register", {req})
                .then(result => {
                    res.status(404).send(result.html);
                }).catch(err => console.log(err));
            return
        }

        let hashedPassword = req.server.getBcrypt().hashSync(password, 10);
        req.server.getDatabase().getConnection().execute('INSERT INTO `PhoenixWeb`(`P_ID`, `Username`, `Password`, `Email`, `Role`) VALUES(?, ?, ?, ?, ?)', [0, username, hashedPassword, email, "Spieler"]);
        req.data = {"State": "200", "Message": "Der Benutzer wurde angelegt, logge dich nun ein!"};
        req.server.getNuxt().renderRoute("/register", {req})
            .then(result => {
                res.status(200).send(result.html);
            }).catch(err => console.log(err));
        return
    });
}
}
module.exports = RegisterRoute;