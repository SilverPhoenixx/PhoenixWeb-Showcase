const AbstractRoute = require('./AbstractRoute');
class IndexRoute extends AbstractRoute {

initialize() {
    this.getApp().get("/", this.middlewareData, async function (req, res) {
        req.server.getNuxt().renderRoute("/", {req})
        .then(result => {
            res.send(result.html);
        })
        .catch(err => {
            res.send(err)
        }) 
    });

    this.getApp().get("/index", this.middlewareData, async function (req, res) {
        req.server.getNuxt().renderRoute("/", {req})
        .then(result => {
            res.send(result.html);
        })
        .catch(err => {
            res.send(err)
        }) 
    });
}
}

module.exports = IndexRoute;