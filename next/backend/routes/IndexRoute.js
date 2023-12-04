import AbstractRoute from "./AbstractRoute.js";
class IndexRoute extends AbstractRoute {

initialize() {
    this.getApp().get("/", this.middlewareData, async function (req, res) {
        return req.server.getNext().render(req, res, '/', { username: null});
    });
}
}

export default IndexRoute;