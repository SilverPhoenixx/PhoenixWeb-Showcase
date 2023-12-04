class AbstractRoute {

    constructor(app, server) {
        this.server = server;
        this.app = app;
        this.initialize();
    }

    initialize() {

    }

    getServer() {
        return this.server;
    }

    getApp() {
        return this.app;
    }

    isAuthenticateAPI = (req, res, next) => {
        if(!req.session.loggedin) {
            res.json({"State": "fail", "Message": "Du bist nicht eingeloggt."});
            return;
        }

        req.server = this.server;
        req.app = this;

        return next();
    }
    isAuthenticate = (req, res, next) => {
        req.server = this.server;
        req.app = this;

        if(!req.session.loggedin) {
            res.redirect("/login");
            return;
        }
        return next();
    }

     isAuthorized = (role) => {
        return async (req, res, next) => {
            let [existResult] = await req.server.getDatabase().getConnection().promise().query("SELECT Role FROM PhoenixWeb WHERE Username = ?", [req.session.username]);
            if(existResult.length === 0) {
                res.redirect("/login");
                return;
            }
            if(existResult[0].Role !== role.Name) {
                res.redirect("/profil");
                return;
            }
            next();
        }
    }

    isAuthorizedWithLevel = async (authorizationLevel, username) => {
            let [existResult] = await this.getServer().getDatabase().getConnection().promise().query("SELECT Role FROM PhoenixWeb WHERE Username = ?", [username]);
            if(existResult.length === 0) {
                return false;
            }

            const role = this.getServer().getRolesByName(existResult[0].Role);
            if(role == null) {
                return false;
            }

            if(role.Id < authorizationLevel) {
                return false;
            }
            return true;
    }


    middlewareData = (req, res, next) => {
        req.server = this.server;
        req.app = this;
        next();
    }
}

export default AbstractRoute;