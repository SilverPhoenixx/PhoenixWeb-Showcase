import AbstractRoute from "./AbstractRoute.js";
class LoginRoute extends AbstractRoute {

    initialize() {
        this.getApp().get('/login', this.middlewareData, function(req, res) {
    
            if(req.session.loggedin) {
            res.redirect("/profil");
            return;    
            }
            
            req.server.getNext().render(req, res, "/login", { username: null});
        });

        this.getApp().get('/logout', this.middlewareData, function(req, res) {
            req.session.destroy();
            res.redirect("/login");
        });

        
        this.getApp().post('/login', this.middlewareData, function(req, res) {
            let email = req.body.email;
            let password = req.body.password;
        
            if (!(email && password)) {
                req.server.getNext().render(req, res, "/login", {username: null, message: "Incorrect Email and/or Password!"});
                return;
            }
    
            req.server.getDatabase().getConnection().query('SELECT * FROM PhoenixWeb WHERE Email = ?', [email], function(error, results, fields) {
                if (results.length === 0 || !req.server.getBcrypt().compareSync(password, results[0].Password)) {
                            
                req.server.getNext().render(req, res, "/login", {username: null, message: "Incorrect Email and/or Password"});
                return;
                }

                req.session.loggedin = true;
                req.session.username = results[0].Username;
                res.redirect("/profil");
                return;
            });
        
        });
    }
}

export default LoginRoute;