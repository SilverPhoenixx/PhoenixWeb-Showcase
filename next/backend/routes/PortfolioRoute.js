import AbstractRoute from "./AbstractRoute.js";
class PortfolioRoute extends AbstractRoute {

    initialize() {
        this.getApp().get("/portfolio", this.middlewareData, async function (req, res) {
            let [imageRows, imageFields] = await req.server.getDatabase().getConnection().promise().query("SELECT Name, Description, Builder FROM PhoenixPortfolio");
            const images = [];
            for (const image of imageRows) {
                image.collection = [];

                if(!req.server.getFileSystem().existsSync(req.server.getFolder() + "/frontend/public/assets/" + image.Name)) continue;
                const listDir = await req.server.getFileSystem().promises.readdir(req.server.getFolder() + "/frontend/public/assets/" + image.Name);
                if(listDir === undefined) continue;
                for (const file of listDir) {
                        if(req.server.getFileSystem().statSync(req.server.getFolder() + "/frontend/public/assets/" + image.Name + "/" + file).isDirectory()) continue;
                        image.collection.push(file);
                }

                images.push(image);
            }
            const username = null;

            req.server.getNext().render(req, res, "/portfolio", {username, images});
        });
    }
}

export default PortfolioRoute;