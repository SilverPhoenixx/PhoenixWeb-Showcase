import AbstractRoute from "./AbstractRoute.js";
class WikiRoute extends AbstractRoute {

initialize() {

    this.getApp().get("/wiki", async function(req, res) {
        res.redirect("/wiki/1");
    });

    this.getApp().get("/wiki/:page([0-9])", this.middlewareData, async function (req, res) {
        if (req.params.page === undefined) {
            res.redirect("/wiki/1");
            return;
        }
        let search = "";
        if (req.query.search !== undefined) {
            search = req.query.search;
        }

        let offsetNumber = !isNaN(parseInt(req.params.page)) ? parseInt(req.params.page) : 1;
        if (isNaN(offsetNumber)) offsetNumber = 1;
        let offset = (offsetNumber * 25) - 25;

        let articles;
        let articlesField;

        if(search === "") {
            [articles, articlesField] = await req.server.getDatabase().getConnection().promise().query("SELECT Title, HeaderURL, DATE_FORMAT(Date, '%e.%c.%Y %H:%i:%S') as Date, PhoenixWeb.Username as Username FROM PhoenixWiki INNER JOIN PhoenixWeb ON PhoenixWiki.Author_Id = PhoenixWeb.U_Id LIMIT 25 OFFSET ?;", [offset]);
        } else {
            [articles, articlesField] = await req.server.getDatabase().getConnection().promise().query("SELECT Title, HeaderURL, DATE_FORMAT(Date, '%e.%c.%Y %H:%i:%S') as Date, PhoenixWeb.Username as Username FROM PhoenixWiki INNER JOIN PhoenixWeb ON PhoenixWiki.Author_Id = PhoenixWeb.U_Id WHERE MATCH(Title) AGAINST(?) LIMIT 25 OFFSET ?;", [search, offset]);
        }

        let editPermission = false;
        if (await req.app.isAuthorizedWithLevel(2, req.session.username)) {
            editPermission = true;
        }

        let data = {
            "searchText": search,
            "page": req.params.page,
            "articles": articles,
            "editPermission": editPermission
        }

        req.server.getNext().render(req, res, "/wiki", {username: null, data});
    });

    this.getApp().get("/wiki/add", this.middlewareData, async function (req, res) {
        if (!await req.app.isAuthorizedWithLevel(2, req.session.username)) {
            res.redirect("/wiki?page=1");
            return;
        }

        req.server.getNext().render(req, res, "/wiki/add", {username: null});
    });


    this.getApp().post("/wiki/add", this.isAuthenticateAPI, async function (req, res) {
        if (!await req.app.isAuthorizedWithLevel(2, req.session.username)) {
            res.json({"State": "fail", "Message": "Du musst eingeloggt sein, um ein Artikel hinzuzufügen."});
            return;
        }

        const content = req.body.Content;
        const title = req.body.Title;
        const headerURL = req.body.HeaderURL;

        let [existWiki, wikiFields] = await req.server.getDatabase().getConnection().promise().query("SELECT ID FROM PhoenixWiki WHERE Title = ?;", [title]);
        if (existWiki.length > 0) {
            res.json({"State": "fail", "Message": "Der Titel existiert bereits."});
            return;
        }

        let [existUser, userFields] = await req.server.getDatabase().getConnection().promise().query("SELECT U_ID FROM PhoenixWeb WHERE Username = ?;", [req.session.username]);
        if (existUser.length <= 0) {
            res.json({"State": "fail", "Message": "Der Benutzer existiert nicht."});
            return;
        }

        req.server.getDatabase().getConnection().promise().query("INSERT INTO PhoenixWiki(`Title`, `HeaderURL`, `Content`, `Author_Id`, `Date`) VALUES(?, ?, ?, (SELECT U_ID FROM PhoenixWeb WHERE Username = ?), CURRENT_TIMESTAMP());", [title, headerURL, content, req.session.username]);
        res.json({"State": "success", "Message": "Der Artikel wurde erfolgreich hinzugefügt."});
    });

    this.getApp().post("/wiki/delete", this.isAuthenticateAPI, async function (req, res) {
        if (!await req.app.isAuthorizedWithLevel(2, req.session.username)) {
            res.json({"State": "fail", "Message": "Du musst eingeloggt sein, um ein Artikel hinzuzufügen oder dir fehlen Berechtigungen."});
            return;
        }

        const title = req.body.Title;

        let [existWiki, wikiFields] = await req.server.getDatabase().getConnection().promise().query("SELECT ID FROM PhoenixWiki WHERE Title = ?;", [title]);
        if (existWiki.length <= 0) {
            res.json({"State": "fail", "Message": "Der Titel existiert nicht."});
            return;
        }

        req.server.getDatabase().getConnection().promise().query("DELETE FROM PhoenixWiki WHERE Title = ?", [title]);
        res.json({"State": "success", "Message": "Der Artikel wurde erfolgreich entfernt."});
    });


    this.getApp().get("/wiki/edit", this.middlewareData, async function (req, res) {
        if (!await req.app.isAuthorizedWithLevel(2, req.session.username)) {
            res.redirect("/wiki?page=1");
            return;
        }

        if (req.query.title === undefined) {
            res.redirect("/wiki?page=1");
            return;
        }

        const title = req.query.title;
        let [existWiki, wikiFields] = await req.server.getDatabase().getConnection().promise().query("SELECT *, CONVERT(Content USING utf8) as Content FROM PhoenixWiki WHERE Title = ?;", [title]);
        if (existWiki.length <= 0) {
            res.redirect("/wiki?page=1");
            return;
        }

        const data = existWiki[0];
        req.server.getNext().render(req, res, "/wiki/edit", {username: null, data});
    });


    this.getApp().post("/wiki/edit", this.isAuthenticateAPI, async function (req, res) {
        if (!await req.app.isAuthorizedWithLevel(2, req.session.username)) {
            res.json({"State": "fail", "Message": "Du musst eingeloggt sein, um ein Artikel hinzuzufügen oder dir fehlen Berechtigungen."});
            return;
        }

        const content = req.body.Content;
        const title = req.body.Title;
        const headerURL = req.body.HeaderURL;

        let [existWiki, wikiFields] = await req.server.getDatabase().getConnection().promise().query("SELECT ID FROM PhoenixWiki WHERE Title = ?;", [title]);
        if (existWiki.length <= 0) {
            res.json({"State": "fail", "Message": "Der Titel existiert nicht."});
            return;
        }

        req.server.getDatabase().getConnection().promise().query("UPDATE PhoenixWiki SET `HeaderURL` = ?,  `Content` = ?,  `Date` = CURRENT_TIMESTAMP(), `Author_Id` = (SELECT U_ID FROM PhoenixWeb WHERE Username = ?) WHERE Title = ?", [headerURL, content, req.session.username, title]);

        res.json({"State": "success", "Message": "Der Artikel wurde erfolgreich geändert."});
    });

    this.getApp().get("/wiki/article", this.middlewareData, async function (req, res) {
        if (req.query.title === undefined) {
            res.redirect("/wiki?page=1");
            return;
        }

        const title = req.query.title;
        let [existWiki, wikiFields] = await req.server.getDatabase().getConnection().promise().query("SELECT Title, HeaderURL, PhoenixWeb.Username, PhoenixID.UUID, DATE_FORMAT(Date, '%e.%c.%Y %H:%i:%S') as Date, CONVERT(Content USING utf8) as Content FROM PhoenixWiki INNER JOIN PhoenixWeb ON PhoenixWeb.U_Id = PhoenixWiki.Author_Id INNER JOIN PhoenixID ON PhoenixID.P_ID = PhoenixWeb.P_ID WHERE Title = ?;", [title]);
        if (existWiki.length <= 0) {
            res.redirect("/wiki?page=1");
            return;
        }

        const data = existWiki[0];
        req.server.getNext().render(req, res, "/wiki/article", {username: null, data});
    });
}
}

export default WikiRoute;