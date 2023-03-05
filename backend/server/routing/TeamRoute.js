const AbstractRoute = require('./AbstractRoute');
class TeamRoute extends AbstractRoute {

initialize() {
    this.getApp().get("/team", this.middlewareData, async function (req, res) {
        req.server.getNuxt().renderRoute("/team", {req})
        .then(result => {
            res.send(result.html);
        })
        .catch(err => {
            res.send(err)
        }) 
    });
}
}
module.exports = TeamRoute;
