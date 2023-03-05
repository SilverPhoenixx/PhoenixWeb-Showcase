const AbstractRoute = require('./AbstractRoute');
class PortfolioRoute extends AbstractRoute {

    initialize() {
        this.getApp().get("/portfolio", this.middlewareData, async function (req, res) {
            let [imageRows, imageFields] = await req.server.getDatabase().getConnection().promise().query("SELECT ImageName as Name FROM PhoenixPortfolio");
            req.data = [];
            req.data.images = imageRows;

            req.server.getNuxt().renderRoute("/portfolio", {req})
                .then(result => {
                    res.send(result.html);
                })
                .catch(err => {
                    res.send(err)
                })
        });
    }
}

module.exports = PortfolioRoute;