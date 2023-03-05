const AbstractRoute = require('./AbstractRoute');
class UserManagementRoute extends AbstractRoute {

initialize() {
    this.getApp().get('/users-management', this.authenticate, async function(req, res) {
        if (!req.query.page) {
            res.redirect("/profil");
            return;
        }
        let offsetNumber = parseInt(req.query.page) != NaN ? parseInt(req.query.page) : 1;
        if (isNaN(offsetNumber)) offsetNumber = 1;
        let offset = (offsetNumber * 10) - 10;

        let [result] = await req.server.getDatabase().getConnection().promise().query("SELECT Role FROM PhoenixWeb WHERE Username = ?", [req.session.username]);

        if (result[0].Role != "Administrator") {

            let [rows, data] = await req.server.getDatabase().getConnection().promise().query("SELECT Role, Username, Email FROM PhoenixWeb ORDER BY Username ASC LIMIT 10 OFFSET ?", [offset]);
            req.data = rows;

            req.page = offsetNumber;
            let htmlResult = await req.server.getNuxt().renderRoute("/users-management", {req});
            res.send(htmlResult.html);
        }
    });
    this.getApp().post('/users-management/password', this.authenticate, async function(req, res) {
            let username = req.session.username;
            let password = req.body.password;
            let email = req.body.email;


            let [existResult] = await req.server.getDatabase().getConnection().promise().query("SELECT Username FROM PhoenixWeb WHERE Email = ?", [email]);
            if(!existResult) {
                res.json({message: "Der Benutzer wurde nicht gefunden.", code: "404"});
                return;
            }

            let hashedPassword = req.server.getBcrypt().hashSync(password, 10);
            await req.server.getDatabase().getConnection().promise().query("UPDATE PhoenixWeb SET Password = ? WHERE Email = ?", [hashedPassword, email]);
            res.json({message: "Das Password wurde erfolgreich geändert.", code: "200"});

    });

    this.getApp().post('/users-management/email', this.authenticate, async function(req, res) {
        let username = req.session.username;
        let email = req.body.email;
        let newemail = req.body.newemail;


        let [existResult] = await req.server.getDatabase().getConnection().promise().query("SELECT Username FROM PhoenixWeb WHERE Email = ?", [email]);
        if(existResult.length == 0) {
            res.json({message: "Der Benutzer wurde nicht gefunden.", code: "404"});
            return;
        }

        let [existNewEmail] = await req.server.getDatabase().getConnection().promise().query("SELECT Username FROM PhoenixWeb WHERE Email = ?", [newemail]);
        if(existNewEmail.length > 0) {
            res.json({message: "Die Email existiert bereits.", code: "404"});
            return;
        }

        await req.server.getDatabase().getConnection().promise().query("UPDATE PhoenixWeb SET Email = ? WHERE Email = ?", [newemail, email]);
        res.json({message: "Die Email wurde erfolgreich geändert.", code: "200"});

});


    this.getApp().get('/user-settings', this.authenticate, this.middlewareData, async function(req, res) {
        let [result] = await req.server.getDatabase().getConnection().promise().query("SELECT * FROM PhoenixWeb WHERE Username = ?", [req.session.username]);
        if(result[0].Role != "Administrator") {
            res.redirect("/profil");
            return;
        }
        req.server.getDatabase().getConnection().query("SELECT Username, Email, Role FROM PhoenixWeb WHERE Username = ?", [req.query.user], 
                function (err, result, fields) {
                    if (err) {
                        res.redirect("/users-management");
                        return;
                    }
                    req.data = result;
                    req.server.getNuxt().renderRoute("/user-settings", {req})
                    .then(result => {
                        res.send(result.html);
                    })
                    .catch(err => res.send(err)) 
                    return;
                });
    });
}   
}
module.exports = UserManagementRoute;