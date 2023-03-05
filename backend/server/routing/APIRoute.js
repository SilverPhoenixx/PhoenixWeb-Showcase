const AbstractRoute = require('./AbstractRoute');
class APIRoute extends AbstractRoute {

initialize() {
/* API vom Minecraft Server */
this.getApp().get("/api/user/:name", this.middlewareData, (req, res) =>{
    req.server.getDatabase().getConnection().query("SELECT * FROM PhoenixID WHERE Name = '" + req.params.name.split(" ")[0] + "'" , function (err, result, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.status(200).json(result[0]);
      });
});


  /* User API über ID*/
  this.getApp().get("/api/id/:id", this.middlewareData, (req, res) => {
    req.server.getDatabase().getConnection().query("SELECT * FROM PhoenixID WHERE P_ID = '" + req.params.id.split(" ")[0] + "'" , function (err, result, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.status(200).json(result[0]);
      });
});

/* User API über UUID */
this.getApp().get("/api/uuid/:uuid", this.middlewareData, (req, res) => {
    req.server.getServer().getConnection().query("SELECT * FROM PhoenixID WHERE UUID = '" + req.params.uuid.split(" ")[0] + "'" , function (err, result, fields) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.status(200).json(result[0]);
      });
});

/* Team API, Rückgabe für Teamseite */
this.getApp().get("/api/team", this.middlewareData, async (req, res) => {
    let [teamRow, teamfield] = await req.server.getDatabase().getConnection().promise().query("SELECT PhoenixTeam.T_ID, PhoenixTeam.Role, PhoenixID.UUID, PhoenixID.Name FROM " +
    "PhoenixTeam INNER JOIN PhoenixID ON PhoenixTeam.P_ID = PhoenixID.P_ID");

    let data = [];

    if(teamRow.length > 0) {
        for (let i = 0; i < teamRow.length; i++) {
            let abilityData = [];

            let [abilityRow, abilityField] = await req.server.getDatabase().getConnection().promise().query("SELECT PhoenixAbility.Ability FROM PhoenixTeamAbility INNER JOIN PhoenixAbility ON PhoenixAbility.Ability_ID = PhoenixTeamAbility.Ability_ID WHERE T_ID = ?", [teamRow[i].T_ID]);

            if(abilityRow.length > 0) {
                for(let abilityPosition = 0; abilityPosition < abilityRow.length; abilityPosition++) {
                    abilityData.push(abilityRow[abilityPosition].Ability);
                }
            }


            let user = {
                "Name": teamRow[i].Name,
                "Role": teamRow[i].Role,
                "UUID": teamRow[i].UUID,
                "Abilities": abilityData
            }
            data.push(user);
        }

        res.status(200).json(data);
        return;
    }

    res.status(404).json({});
    });
}
}
module.exports = APIRoute;