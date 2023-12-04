import AbstractRoute from "./AbstractRoute.js";
class TeamRoute extends AbstractRoute {

initialize() {
    this.getApp().get("/team", this.middlewareData, async function (req, res) {
        req.server.getNext().render(req, res, "/team", {username: null});
    });
}
}
export default TeamRoute;
