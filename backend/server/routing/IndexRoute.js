import AbstractRoute from "./AbstractRoute.js";
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
}
}

export default IndexRoute;