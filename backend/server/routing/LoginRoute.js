const AbstractRoute = require('./AbstractRoute');
class LoginRoute extends AbstractRoute {

    initialize() {
        this.getApp().get('/login', this.middlewareData, function(req, res) {
    
            if(req.session.loggedin) {
            res.redirect("/profil");
            return;    
            }
            
            req.server.getNuxt().renderRoute("/login", {req})
            .then(result => {
                res.send(result.html);
            }).catch(err => console.log(err));
        });

        this.getApp().get('/logout', this.middlewareData, function(req, res) {
            req.session.destroy();
            res.redirect("/login");
        });

        
        this.getApp().post('/login', this.middlewareData, function(req, res) {
            let email = req.body.email;
            let password = req.body.password;
        
            if (!(email && password)) {
                let data = {"message": "Incorrect Email and/or Password!"}
                req.data = data;
                req.server.getNuxt().renderRoute("/login", {req})
                .then(result => {
                    res.render(result.html);
                }).catch(err => console.log(err));
                return;
            }
    
            req.server.getDatabase().getConnection().query('SELECT * FROM PhoenixWeb WHERE Email = ?', [email], function(error, results, fields) {
                if (results.length == 0 || !req.server.getBcrypt().compareSync(password, results[0].Password)) {
                    let data = {"message": "Incorrect Email and/or Password!"}
                    req.data = data;
                            
                req.server.getNuxt().renderRoute("/login", {req})
                .then(result => {
                    res.send(result.html);
                }).catch(err => console.log(err));
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

module.exports = LoginRoute;