const AbstractRoute = require('./AbstractRoute');
const archiver = require('archiver');
const formidable = require('formidable');
const {raw} = require("express");

async function zipDirectory(sourceDir, outPath, name, server) {
    const archive = archiver('zip', {zlib: {level: 9}});
    const stream = server.getFileSystem().createWriteStream(outPath);

    return new Promise((resolve, reject) => {
        archive
            .directory(sourceDir, name)
            .on('error', err => reject(err))
            .pipe(stream);

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

function handleWorld(req, res) {
    let formData = formidable({keepExtensions: true, maxFileSize: 500 * 1024 * 1024})
    formData.parse(req, (err, fields, files) => {
        if(err) {
            console.log(err);
        }
        req.server.getFileSystem().rename(files.world.filepath, "/home/bauen/PhoenixWeb/backend/worlds/" + files.world.newFilename, (err) => {
            if(err) {
                console.log(err);
            }
            res.status(200).json({
                "State": "200",
                "Message": files.world.newFilename
            });
            return true;
        })
    })
}

async function connectedId(username, server) {
   let [rows, fields] = await server.getDatabase().getConnection().promise().query("SELECT PhoenixWeb.P_ID, PhoenixWeb.Role, PhoenixID.UUID FROM PhoenixWeb INNER JOIN PhoenixID ON PhoenixWeb.P_ID = PhoenixID.P_ID WHERE Username = ?", [username]);
    if (rows.length > 0) {
        return true;
    }
    return false;
}

class WorldRoute extends AbstractRoute {

    initialize() {
        this.getApp().get("/world-settings", this.authenticate, async function (req, res) {
            if(!await connectedId(req.session.username, req.server)) {
                res.redirect("/profil");
                return;
            }


            let [world, worldField] = await req.server.getDatabase().getConnection().promise().query("SELECT PhoenixWorlds.*, W_ID FROM" +
                " `PhoenixWorlds` JOIN PhoenixWeb ON PhoenixWorlds.P_ID = PhoenixWeb.P_ID WHERE Server = ? AND World = ? AND PhoenixWeb.Username = ?", [req.query.server, req.query.world, req.session.username]);
            if (!(world.length > 0)) {
                res.redirect("/worlds");
                return;
            }

            let [warps, warpField] = await req.server.getDatabase().getConnection().promise().query("SELECT Name, X, Y, Z, Yaw, Pitch FROM PhoenixWorldWarps WHERE W_ID = ?", [world[0].W_ID]);
            let warpList = [];
            for (let i = 0; i < warps.length; i++) {
                warpList.push(warps[i]);
            }

            let [builder, builderField] = await req.server.getDatabase().getConnection().promise().query("SELECT PhoenixID.UUID, PhoenixID.Name FROM PhoenixWhiteList JOIN PhoenixID ON PhoenixID.P_ID = PhoenixWhiteList.P_ID WHERE W_ID = ?", [world[0].W_ID]);
            let builderList = [];
            for (let i = 0; i < builder.length; i++) {
                builderList.push(builder[i]);
            }


            req.data = {
                "Server": world[0].Server,
                "World": world[0].World,
                "Type": world[0].Type,
                "State": world[0].State,
                "Permission": world[0].Permission,
                "Settings": world[0].Settings,
                "Warps": warpList,
                "Builder": builderList
            }
            req.server.getNuxt().renderRoute("/world-settings", {req})
                .then(result => {
                    res.send(result.html);
                })
                .catch(err => console.log(err));
            return;
        });


        /* Hinzuf??gen eines Builders */
        this.getApp().post('/world/builder/add', this.middlewareData, async function (req, res) {
            // ??berpr??fung ob der User angemeldet ist, wenn nicht bekommt er eine Meldung
            if (!req.session.loggedin) {
                res.status(403).json({"State": "0"});
                return;
            }
            if(!await connectedId(req.session.username, req.server)) {
                res.status(403).json({"State": "0"});
                return;
            }


            if (req.body.server == "" ||
                req.body.world == "" ||
                req.body.buildername == "") {
                res.status(404).json({"Message": "Fehler: Alle Felder m??ssen ausgef??llt werden."});
                return;
            }

            // ??berpr??fung ob der Warp vom User erstellt wurde
            let [rows, fields] = await req.server.getDatabase().getConnection().promise().query("SELECT * FROM `PhoenixWhiteList` WHERE W_ID = (SELECT W_ID FROM `PhoenixWorlds` WHERE Server = ? AND World = ? AND P_ID = (SELECT P_ID FROM PhoenixWeb WHERE Username = ?)) AND P_ID = (SELECT P_ID FROM PhoenixID WHERE Name = ?)", [req.body.server, req.body.world, req.session.username, req.body.buildername]);
            if (rows.length > 0) {
                res.status(404).json({"Message": "Fehler: Der Spieler ist bereits Builder auf der Welt."});
                return;
            }

            req.server.getDatabase().getConnection().execute("INSERT INTO `PhoenixWhiteList`(`W_ID`, `P_ID`) VALUES ((SELECT W_ID FROM PhoenixWorlds WHERE Server = ? AND World = ?), (SELECT P_ID FROM PhoenixID WHERE Name = ?))", [req.body.server, req.body.world, req.body.buildername]);

            let ids = await req.server.getDatabase().getConnection().promise().query("SELECT UUID, P_ID FROM PhoenixID WHERE Name = ?", [req.body.buildername]);

            res.status(200).json({
                "State": "200",
                "Message": "Der Teleportationspunkt " + req.body.buildername + " wurde erfolgreich hinzugef??gt.",
                "UUID": ids[0][0].UUID
            });
            req.server.getSocket().sendMessage(JSON.stringify({
                Action: "BuilderAdd",
                Server: req.body.server,
                World: req.body.world,
                Id: ids[0][0].P_ID
            }))
        });

        /* Hinzuf??gen eines Warp */
        this.getApp().post('/world/warp/add', this.middlewareData, async function (req, res) {
            // ??berpr??fung ob der User angemeldet ist, wenn nicht bekommt er eine Meldung
            if (!req.session.loggedin) {
                res.status(403).json({"State": "0"});
                return;

            }

            if(!await connectedId(req.session.username, req.server)) {
                res.status(403).json({"State": "0"});
                return;
            }

            if (req.body.server === "" ||
                req.body.world === "" ||
                req.body.warpname === "" ||
                req.body.x === "" ||
                req.body.y === "" ||
                req.body.z === "" ||
                req.body.yaw === "" ||
                req.body.pitch === "") {
                res.status(404).json({"Message": "Fehler: Alle Felder m??ssen ausgef??llt werden."});
                return;
            }

            // ??berpr??fung ob der Warp vom User erstellt wurde
            let [rows, fields] = await req.server.getDatabase().getConnection().promise().query("SELECT * FROM `PhoenixWorldWarps` WHERE W_ID = (SELECT W_ID FROM PhoenixWorlds WHERE Server = ? AND World = ? AND P_ID = (SELECT P_ID FROM PhoenixWeb WHERE Username = ?)) AND Name = ?", [req.body.server, req.body.world, req.session.username, req.body.warpname]);
            if (rows.length > 0) {
                res.status(404).json({"Message": "Fehler: Der Warp existiert bereits."});
                return;
            }

            req.server.getDatabase().getConnection().execute("INSERT INTO `PhoenixWorldWarps`(`W_ID`, `Name`, `X`, `Y`, `Z`, `Yaw`, `Pitch`) VALUES ((SELECT W_ID FROM PhoenixWorlds WHERE Server = ? AND World = ?), ?, ?, ?, ?, ?, ?)", [req.body.server, req.body.world, req.body.warpname, req.body.x, req.body.y, req.body.z, req.body.yaw, req.body.pitch]);
            res.status(200).json({
                "State": "200",
                "Message": "Der Teleportationspunkt " + req.body.warpname + " wurde erfolgreich hinzugef??gt."
            });

            req.server.getSocket().sendMessage(JSON.stringify({
                Action: "WarpAdd",
                Server: req.body.server,
                World: req.body.world,
                Warpname: req.body.warpname,
                X: req.body.x,
                Y: req.body.y,
                Z: req.body.z,
                Yaw: req.body.yaw,
                Pitch: req.body.pitch
            }));
        });

        /* Entfernung eines Warp */
        this.getApp().post('/world/warp/remove', this.middlewareData, async function (req, res) {
            // ??berpr??fung ob der User angemeldet ist, wenn nicht bekommt er eine Meldung
            if (!req.session.loggedin) {
                res.status(403).json({"State": "0"});
                return;
            }

            if(!await connectedId(req.session.username, req.server)) {
                res.status(403).json({"State": "0"});
                return;
            }

            // ??berpr??fung ob der Warp vom User erstellt wurde
            let [rows, fields] = await req.server.getDatabase().getConnection().promise().query("SELECT * FROM `PhoenixWorldWarps` WHERE W_ID = (SELECT W_ID FROM PhoenixWorlds WHERE Server = ? AND World = ? AND P_ID = (SELECT P_ID FROM PhoenixWeb WHERE Username = ?)) AND Name = ?", [req.body.server, req.body.world, req.session.username, req.body.warp]);
            if (!(rows.length > 0)) {
                res.status(404).json({"Message": "Fehler: Der Warp wurde nicht gefunden."});
                return;
            }

            req.server.getDatabase().getConnection().execute("DELETE FROM `PhoenixWorldWarps` WHERE W_ID = (SELECT W_ID FROM PhoenixWorlds WHERE Server = ? AND World = ?) AND Name = ?", [req.body.server, req.body.world, req.body.warp]);
            res.status(200).json({
                "State": "200",
                "Message": "Der Teleportationspunkt " + req.body.warp + " wurde erfolgreich entfernt."
            });

            req.server.getSocket().sendMessage(JSON.stringify({
                Action: "WarpRemove",
                Server: req.body.server,
                World: req.body.world,
                Warpname: req.body.warp
            }));
        });

        /* Entfernung eines Builders */
        this.getApp().post('/world/builder/remove', this.middlewareData, async function (req, res) {
            // ??berpr??fung ob der User angemeldet ist, wenn nicht bekommt er eine Meldung
            if (!req.session.loggedin) {
                res.status(403).json({"State": "0"});
                return;
            }

            if(!await connectedId(req.session.username, req.server)) {
                res.status(403).json({"State": "0"});
                return;
            }

            // ??berpr??fung ob der Warp vom User erstellt wurde
            let [rows, fields] = await req.server.getDatabase().getConnection().promise().query("SELECT * FROM `PhoenixWhiteList` WHERE W_ID = (SELECT W_ID FROM `PhoenixWorlds` WHERE Server = ? AND World = ? AND P_ID = (SELECT P_ID FROM PhoenixWeb WHERE Username = ?)) AND P_ID = (SELECT P_ID FROM PhoenixID WHERE Name = ?)", [req.body.server, req.body.world, req.session.username, req.body.builder]);
            if (!(rows.length > 0)) {
                res.status(404).json({"Message": "Fehler: Der Builder wurde nicht gefunden."});
                return;
            }

            req.server.getDatabase().getConnection().execute("DELETE FROM `PhoenixWhiteList` WHERE W_ID = (SELECT W_ID FROM `PhoenixWorlds` WHERE Server = ? AND World = ?) AND P_ID = (SELECT P_ID FROM PhoenixID WHERE Name = ?)", [req.body.server, req.body.world, req.body.builder]);


            res.status(200).json({
                "State": "200",
                "Message": "Der Builder " + req.body.builder + " wurde erfolgreich entfernt."
            });

            let ids = await req.server.getDatabase().getConnection().promise().query("SELECT P_ID FROM PhoenixID WHERE Name = ?", [req.body.builder]);
            req.server.getSocket().sendMessage(JSON.stringify({
                Action: "BuilderRemove",
                Server: req.body.server,
                World: req.body.world,
                Id: ids[0][0].P_ID
            }));
        });

        this.getApp().post('/world/settings', this.middlewareData, async function (req, res) {
            if (!req.session.loggedin) {
                res.status(403).json({"State": "0"});
                return;
            }

            if(!await connectedId(req.session.username, req.server)) {
                res.status(403).json({"State": "0"});
                return;
            }
            let [rows, fields] = await req.server.getDatabase().getConnection().promise().query("SELECT PhoenixWorlds.* FROM `PhoenixWorlds` JOIN PhoenixWeb ON PhoenixWorlds.P_ID = PhoenixWeb.P_ID WHERE Server = ? AND World = ? AND PhoenixWeb.Username = ?", [req.body.server, req.body.world, req.session.username]);
            if (!(rows.length > 0)) {
                res.status(404).json({"Message": "Fehler: Welt wurde nicht gefunden."});
                return;
            }

            req.server.getDatabase().getConnection().execute("UPDATE `PhoenixWorlds` SET `Settings`= ? WHERE Server = ? AND World = ?", [req.body.settings, req.body.server, req.body.world]);
            res.status(200).json({"Message": "Die Einstellungen wurden erfolgreich ge??ndert."});
        });

        this.getApp().post('/world/information', this.middlewareData, async function (req, res) {
            if (!req.session.loggedin) {
                res.status(403).json({"State": "0"});
                return;

            }
            let [rows, fields] = await req.server.getDatabase().getConnection().promise().query("SELECT PhoenixWorlds.* FROM `PhoenixWorlds` JOIN PhoenixWeb ON PhoenixWorlds.P_ID = PhoenixWeb.P_ID WHERE Server = ? AND World = ? AND PhoenixWeb.Username = ?", [req.body.server, req.body.world, req.session.username]);
            if (!(rows.length > 0)) {
                res.status(404).json({"Message": "Fehler: Welt wurde nicht gefunden."});
                return;
            }

            req.server.getDatabase().getConnection().execute("UPDATE `PhoenixWorlds` SET `Permission`= ?, `State` = ? WHERE Server = ? AND World = ?", [req.body.permission, req.body.state, req.body.server, req.body.world]);
            res.status(200).json({"Message": "Die Einstellungen wurden erfolgreich ge??ndert."});
        });

        this.getApp().get('/worlds', this.authenticate, async function (req, res) {
            if (!req.query.page) {
                res.redirect("/profil");
                return;
            }

            if(!await connectedId(req.session.username, req.server)) {
                console.log(req.session.username);
                res.redirect("/profil");
                return;
            }

            let offsetNumber = parseInt(req.query.page) != NaN ? parseInt(req.query.page) : 1;
            if (isNaN(offsetNumber)) offsetNumber = 1;
            let offset = (offsetNumber * 10) - 10;


            let [rows, fields] = await req.server.getDatabase().getConnection().promise().query("SELECT PhoenixWorlds.* FROM `PhoenixWeb` JOIN PhoenixWorlds ON PhoenixWeb.P_ID = PhoenixWorlds.P_ID WHERE Username = ? ORDER BY World ASC LIMIT 10 OFFSET ?", [req.session.username, offset]);
            let data = [];

            for (let i = 0; i < rows.length; i++) {
                let world = {
                    "W_ID": rows[i].W_ID,
                    "Server": rows[i].Server,
                    "World": rows[i].World,
                    "Type": rows[i].Type,
                    "State": rows[i].State,
                    "Permission": rows[i].Permission,
                }
                data.push(world);
            }


            let [rowsServer, fieldsServer] = await req.server.getDatabase().getConnection().promise().query("SELECT DISTINCT Server FROM `PhoenixWorlds`");
            let servers = [];

            for (let i = 0; i < rowsServer.length; i++) {
                let server = {
                    "Server": rowsServer[i].Server,
                }
                servers.push(server);
            }


            req.data = data;
            req.servers = servers;
            req.page = offsetNumber;
            req.server.getNuxt().renderRoute("/worlds", {req})
                .then(result => {
                    res.send(result.html);
                })
                .catch(err => console.log(err))
            return;
        });

        /* Welt herunterladen */
        this.getApp().get('/world/download/', this.authenticate, (req, res, next) => {
            req.zip = this.zipDirectory;
            next();
        }, async function (req, res) {


            if(!await connectedId(req.session.username, req.server)) {
                res.status(404);
                return;
            }

            let [rows, fields] = await req.server.getDatabase().getConnection().promise().query("SELECT PhoenixWorlds.* FROM `PhoenixWorlds` JOIN PhoenixWeb ON PhoenixWorlds.P_ID = PhoenixWeb.P_ID WHERE Server = ? AND World = ? AND PhoenixWeb.Username = ?", [req.query.server, req.query.world, req.session.username]);
            if (!(rows.length > 0)) {
                res.status(404).send("Map doesnt exists.");
                return;
            }
            const folder = "/home/bauen/cloud-system/base/static/server/" + req.query.server + "/worlds/";

            await zipDirectory(folder + req.query.world, folder + req.query.world + ".zip", req.query.world, req.server);
            const file = folder + req.query.world + ".zip";
            try {
                if (!req.server.getFileSystem().existsSync(file)) {
                    res.sendStatus(404);
                    return;
                }
                res.status(200).download(file, () => {
                    req.server.getFileSystem().unlinkSync(file)
                });
            } catch {
                res.sendStatus(500);
            }
        });

        /* Connect with Login System  */
        this.getApp().post("/world/upload", this.authenticate, (req, res, next) => {
            req.handleWorld = this.handleWorld;
            next()
        }, async (req, res) => {
            if (!await connectedId(req.session.username, req.server)) {
                res.status(404);
                return;
            }
            handleWorld(req, res);
        })
    }
}

module.exports = WorldRoute;