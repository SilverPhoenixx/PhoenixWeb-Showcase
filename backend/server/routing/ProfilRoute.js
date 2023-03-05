
const AbstractRoute = require('./AbstractRoute');
class ProfilRoute extends AbstractRoute {

initialize() {
this.getApp().get('/profil', this.authenticate, function(req, res) {
    req.server.getDatabase().getConnection().query("SELECT PhoenixWeb.P_ID, PhoenixWeb.Role, PhoenixID.UUID FROM " +
            "PhoenixWeb INNER JOIN PhoenixID ON PhoenixWeb.P_ID = PhoenixID.P_ID WHERE Username = ?", [req.session.username],
            function (err, result, fields) {
                if (err) {
                    req.server.getNuxt().renderRoute("/login", {req})
                    .then(result => {
                        res.send(result.html);
                    })
                    .catch(err => res.send(err)) 
                    return;
                }
                req.body.username = req.session.username;
                if(result.length > 0) {
                req.data = {"username": req.session.username, "uuid": result[0].UUID, "role": result[0].Role, "id": result[0].P_ID}
                } else {
                req.data = {"username": req.session.username, "uuid": "/", "role": "Account wurde noch nicht verbunden.", "id": 0}
                }


        
                req.server.getNuxt().renderRoute("/profil", {req})
                .then(result => {
                    res.send(result.html);
                })
                .catch(err => {
                    console.log(err);
                    res.send(err)
                })
              });
});

    this.getApp().post('/user/setemail', this.authenticate, async (req, res) => {
        let username = req.session.username;

        let currentpassword = req.body.currentpassword;
        let email = req.body.email;
        let emailRepeat = req.body.emailRepeat;

        let [rowPassword, fieldsServer] = await req.server.getDatabase().getConnection().promise().query("SELECT Password FROM `PhoenixWeb` WHERE Username = ?", [username]);
        if(!(rowPassword.length > 0)) {
            res.status(400).json({"State": "400", "Message": "Ein Fehler ist bei der Änderung der E-Mail aufgetreten."});
            return;
        }

        let password = rowPassword[0].Password;
        let compared = await req.server.getBcrypt().compare(currentpassword, password)
        if(!compared) {
            res.status(400).json({"State": "400", "Message": "Das Passwort ist inkorrekt."});
            return;
        }

        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        if(!regexExp.test(email)) {
            res.status(400).json({"State": "400", "Message": "Die neue E-Mail ist keine valide E-Mail."});
            return;
        }

        if(emailRepeat != email) {
            res.status(400).json({"State": "400", "Message": "Die neue E-Mail und die Wiederholung übereinstimmen nicht."});
            return;
        }
        let [rowEmail, fieldEmail] = await req.server.getDatabase().getConnection().promise().query("SELECT Email FROM `PhoenixWeb` WHERE Email = ?", [email]);
        if(rowEmail.length > 0) {
            res.status(400).json({"State": "400", "Message": "Die E-Mail existiert bereits."});
            return;
        }

        req.server.getDatabase().getConnection().execute("UPDATE PhoenixWeb SET Email = ? WHERE Username = ?", [email, username]);
        res.status(200).json({"State": "200", "Message": "Die E-Mail wurde erfolgreich geändert."});
    });


    this.getApp().post('/user/setpassword', this.authenticate, async (req, res) => {
        let username = req.session.username;

        let oldpassword = req.body.oldpassword;
        let password = req.body.password;
        let passwordRepeat = req.body.passwordRepeat;

        let [rowPassword, fieldsServer] = await req.server.getDatabase().getConnection().promise().query("SELECT Password FROM `PhoenixWeb` WHERE Username = ?", [username]);
        if(!(rowPassword.length > 0)) {
            res.status(400).json({"State": "400", "Message": "Ein Fehler ist bei der Änderung des Passworts aufgetreten."});
            return;
        }

        let selectedPassword = rowPassword[0].Password;

        let compared = await req.server.getBcrypt().compare(oldpassword, selectedPassword)
        if(!compared) {
            res.status(400).json({"State": "400", "Message": "Das Passwort ist inkorrekt."});
            return;
        }

        if(password != passwordRepeat) {
            res.status(400).json({"State": "400", "Message": "Das neue Passwort und die Wiederholung übereinstimmen nicht."});
            return;
        }

        let hashedPassword = req.server.getBcrypt().hashSync(password, 10);
        req.server.getDatabase().getConnection().execute("UPDATE PhoenixWeb SET Password = ? WHERE Username = ?", [hashedPassword, username]);
        res.status(200).json({"State": "200", "Message": "Das Passwort wurde erfolgreich geändert."});
    });



}



}
module.exports = ProfilRoute;