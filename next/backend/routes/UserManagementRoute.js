import AbstractRoute from "./AbstractRoute.js";
class UserManagementRoute extends AbstractRoute {

initialize() {
    this.getApp().get('/users-management', this.isAuthenticate, this.isAuthorized(this.getServer().getRoles().ADMINISTRATOR), async function(req, res) {
        if (!req.query.page) {
            res.redirect("/profil");
            return;
        }
        let offsetNumber = parseInt(req.query.page) != NaN ? parseInt(req.query.page) : 1;
        if (isNaN(offsetNumber)) offsetNumber = 1;
        let offset = (offsetNumber * 10) - 10;

            let [rows, data] = await req.server.getDatabase().getConnection().promise().query("SELECT Role, Username, Email, (SELECT Username FROM PhoenixID WHERE PhoenixID.P_ID = PhoenixWeb.P_ID) as MinecraftName FROM PhoenixWeb ORDER BY Username ASC LIMIT 10 OFFSET ?;", [offset]);

            req.server.getNext().render(req, res, "/users-management", {username: null, data: rows, page: offsetNumber});
    });
    this.getApp().post('/users-management/password', this.isAuthenticate, this.isAuthorized(this.getServer().getRoles().ADMINISTRATOR), async function(req, res) {
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

    this.getApp().post('/users-management/email', this.isAuthenticate, this.isAuthorized(this.getServer().getRoles().ADMINISTRATOR), async function(req, res) {
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

    this.getApp().post('/users-management/addUser', this.isAuthenticate, this.isAuthorized(this.getServer().getRoles().ADMINISTRATOR), async function(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let minecraftName = req.body.minecraftName;
        let username = req.body.username;
        let role = req.body.role;

        let [existEmail] = await req.server.getDatabase().getConnection().promise().query("SELECT Username FROM PhoenixWeb WHERE Email = ?", [email]);
        if(existEmail.length > 0) {
            res.json({message: "Ein Benutzer mit der E-Mail existiert bereits.", code: "404"});
            return;
        }

        let [existUsername] = await req.server.getDatabase().getConnection().promise().query("SELECT Username FROM PhoenixWeb WHERE Username = ?", [username]);
        if(existUsername.length > 0) {
            res.json({message: "Ein Benutzer mit dem Benutzernamen existiert bereits.", code: "404"});
            return;
        }

        let id = 0;
        if(minecraftName !== "") {
            let [existMinecraft] = await req.server.getDatabase().getConnection().promise().query("SELECT P_ID FROM PhoenixID WHERE Name = ?", [minecraftName]);
            if(existMinecraft.length > 0) {
                id = existMinecraft[0].P_ID;
            }
        }


        const hashedPassword = req.server.getBcrypt().hashSync(password, 10);
        await req.server.getDatabase().getConnection().promise().query("INSERT INTO PhoenixWeb(P_ID, Username, Password, Email, Role) VALUES(?, ?, ?, ?, ?);", [id, username, hashedPassword, email, role]);
        res.json({message: "Die Daten wurden erfolgreich geändert.", code: "200"});

    });

    this.getApp().post('/users-management/informationen', this.isAuthenticate, this.isAuthorized(this.getServer().getRoles().ADMINISTRATOR), async function(req, res) {
        let email = req.body.email;
        let role = req.body.role;
        let minecraftName = req.body.minecraftName;

        let [existResult] = await req.server.getDatabase().getConnection().promise().query("SELECT Username FROM PhoenixWeb WHERE Email = ?", [email]);
        if(existResult.length == 0) {
            res.json({message: "Der Benutzer wurde nicht gefunden.", code: "404"});
            return;
        }

        let id = 0;
        if(minecraftName !== "") {
            let [existMinecraft] = await req.server.getDatabase().getConnection().promise().query("SELECT P_ID FROM PhoenixID WHERE Name = ?", [minecraftName]);
            if(existMinecraft.length > 0) {
                id = existMinecraft[0].P_ID;
            }
        }
        await req.server.getDatabase().getConnection().promise().query("UPDATE PhoenixWeb SET P_ID = ?, Role = ? WHERE Email = ?", [id, role, email]);
        res.json({message: "Die Daten wurden erfolgreich geändert.", code: "200"});

    });
}   
}
export default UserManagementRoute;