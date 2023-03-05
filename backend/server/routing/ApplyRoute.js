const AbstractRoute = require('./AbstractRoute');
class ApplyRoute extends AbstractRoute {

initialize() {
    this.getApp().get("/apply-info", this.middlewareData, async function (req, res) {
        req.server.getNuxt().renderRoute("/apply-info", {req})
        .then(result => {
            res.send(result.html);
        })
        .catch(err => {
            res.send(err)
        }) 
    });

    this.getApp().get("/apply", this.middlewareData, async function (req, res) {
        req.server.getNuxt().renderRoute("/apply", {req})
        .then(result => {
            res.send(result.html);
        })
        .catch(err => {
            res.send(err)
        }) 
    });

    this.getApp().post("/apply", this.middlewareData, async function (req, res) {

        // Definierung der Daten, die via POST übermittelt wurden.
        let name = req.body.Name;
        let minecraftName = req.body.MinecraftName;
        let age = req.body.Age;
        let discord = req.body.Discord;
        let description = req.body.Description == "" ? "Keine Informationen angegeben." : req.body.Description;
        let position = req.body.Position;
        let portfolio = req.body.Portfolio;
        let status = "In Progress";
        
        // Abfrage ob der Spieler bereits existiert
        const results = await req.server.getDatabase().getConnection().promise().query('SELECT APP_ID FROM PhoenixApplication WHERE MinecraftName = ?', [minecraftName]);
            if(results.length > 0) {
                req.data = data = {
                   "type": "danger",
                   "message": "Sie haben sich bereits beworben."
               };
                        
                req.server.getNuxt().renderRoute("/apply", {req})
                .then(result => {
                res.send(result.html);
                }).catch(err => console.log(err));
           
                return;
               }
    
            
        const date = new Date();
        const month = date.getMonth()+1;
        const dateString = date.getDate() + "." + month + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
       
    
        // Einpflegung von der Bewerbung
        req.server.getDatabase().getConnection().query('INSERT INTO PhoenixApplication(Name, MinecraftName, Age, Discord, Description, Position, Portfolio, Date, State) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, minecraftName, age, discord, description, position, portfolio, dateString, status], function(error, results, fields) {
           if(error) {
    
            req.data = {
                    "type": "danger",
                    "message": "Ein Fehler ist aufgetreten."
                }
                        
                req.server.getNuxt().renderRoute("/apply", {req})
                .then(result => {
                res.send(result.html);
                }).catch(err => console.log(err));
                return;
            }
    
            req.data = {
                "type": "success",
                "message": "Ihre Bewerbung wurde erfolgreich eingereicht."
            }
    
                
            req.server.getNuxt().renderRoute("/apply", {req})
            .then(result => {
            res.send(result.html);
            }).catch(err => console.log(err));
            return;
    });
    });
}
}
module.exports = ApplyRoute;