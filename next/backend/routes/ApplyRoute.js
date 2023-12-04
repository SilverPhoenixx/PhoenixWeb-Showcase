import AbstractRoute from "./AbstractRoute.js";
class ApplyRoute extends AbstractRoute {

initialize() {
    this.getApp().get("/apply-info", this.middlewareData, async function (req, res) {
        req.server.getNext().render(req, res, "/apply-info", {username: null});
    });

    this.getApp().get("/apply", this.middlewareData, async function (req, res) {
        req.server.getNext().render(req, res, "/apply", {username: null});
    });

    this.getApp().post("/apply", this.middlewareData, async function (req, res) {

        // Definierung der Daten, die via POST übermittelt wurden.
        let name = req.body.Name;
        let minecraftName = req.body.MinecraftName;
        let age = req.body.Age;
        let discord = req.body.Discord;
        let description = req.body.Content === "" ? "Keine Informationen angegeben." : req.body.Content;
        let position = req.body.Position;
        let portfolio = req.body.Portfolio;
        let status = "In Progress";
        
        // Abfrage ob der Spieler bereits existiert
        const [existUser, userFields] = await req.server.getDatabase().getConnection().promise().query('SELECT APP_ID FROM PhoenixApplication WHERE MinecraftName = ?', [minecraftName]);
            if(existUser.length > 0) {

                req.server.getNext().render(req, res, "/apply", {username: null, type: "danger", message: "Sie haben sich bereits beworben."});
                return;
               }
    
            
        const date = new Date();
        const month = date.getMonth()+1;
        const dateString = date.getDate() + "." + month + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
       
    
        // Einpflegung von der Bewerbung
        req.server.getDatabase().getConnection().query('INSERT INTO PhoenixApplication(Name, MinecraftName, Age, Discord, Description, Position, Portfolio, Date, State) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, minecraftName, age, discord, description, position, portfolio, dateString, status], function(error, results, fields) {
           if(error) {
                req.server.getNext().render(req, res, "/apply", {username: null, type: "danger", message: "Ein Fehler ist aufgetreten."});
                return;
            }

            req.server.getNext().render(req, res, "/apply", {username: null, type: "success", message: "Ihre Bewerbung wurde erfolgreich eingereicht."});
            return;
    });
    });
}
}
export default ApplyRoute;