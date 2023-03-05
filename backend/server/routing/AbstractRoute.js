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

    authenticate = (req, res, next) => { 
        req.server = this.server;

        if(!req.session.loggedin) {
            res.redirect("/login");
            return;
        }
        return next();
    }


    middlewareData = (req, res, next) => {
        req.server = this.server;
        next();
    }
}

module.exports = AbstractRoute;