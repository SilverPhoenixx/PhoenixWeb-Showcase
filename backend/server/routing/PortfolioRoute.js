import AbstractRoute from "./AbstractRoute.js";
class PortfolioRoute extends AbstractRoute {

    initialize() {
        this.getApp().get("/portfolio", this.middlewareData, async function (req, res) {
            let [imageRows, imageFields] = await req.server.getDatabase().getConnection().promise().query("SELECT Name, Description, Builder FROM PhoenixPortfolio");
            req.data = []
            for (const image of imageRows) {
                image.Pictures = [];

                if(!req.server.getFileSystem().existsSync(req.server.getFolder() + "/../frontend/static/assets/" + image.Name)) continue;
                const listDir = await req.server.getFileSystem().promises.readdir(req.server.getFolder() + "/../frontend/static/assets/" + image.Name);
                if(listDir === undefined) continue;
                for (const file of listDir) {
                        if(req.server.getFileSystem().statSync(req.server.getFolder() + "/../frontend/static/assets/" + image.Name + "/" + file).isDirectory()) continue;
                        image.Pictures.push(file);
                }
            }
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

export default PortfolioRoute;