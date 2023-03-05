/* Express Server */
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

/* Erstellung der Express Umgebung */
const app = express();


/* HTTPS Server */
const https = require("https");
const cors = require('cors')

/* Nuxt System */
const { loadNuxt, build } = require('nuxt')

/* File System */
const fs = require("fs");

/* Falsche Zertifikate (Während des Development Prozesses) */
const cert = fs.readFileSync(__dirname + "/server/certificates/server.cert");
const key = fs.readFileSync(__dirname + "/server/certificates/server.key");

/* Erstellung eines Verschlüsselungssystems */
const bcrypt = require("bcrypt");

/* Datenhaltung */
let Database = require("./server/dataholder/Database");


/* Routes */
let IndexRoute = require("./server/routing/IndexRoute");
let LoginRoute = require("./server/routing/LoginRoute");
let RegisterRoute = require("./server/routing/RegisterRoute");
let APIRoute = require("./server/routing/APIRoute");
const ProfilRoute = require("./server/routing/ProfilRoute");
const ApplyRoute = require("./server/routing/ApplyRoute");
const WorldRoute = require("./server/routing/WorldRoute");
const UserManagementRoute = require("./server/routing/UserManagementRoute");
const TeamRoute = require("./server/routing/TeamRoute");
const PortfolioRoute = require("./server/routing/PortfolioRoute");

class Server {

constructor() {
    this.database = new Database();

    this.server = this.configurate();
    this.loadRoutes();
}

configurate() {
    app.use(session(this.getSessionConfiguration()));

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
   // app.use("/", express.static("../frontend/static"));
   // app.use("/_nuxt", express.static("./.nuxt/dist/client"));


return https.createServer({ key: key, cert: cert }, app).listen(3000);
}

getSessionConfiguration() {
    const days = 7 * 1000 * 60 * 60 * 24;
    return {
        secret: "200820012210202104032001",
        name: "Nachrichten Ticker",
        saveUninitialized: true,
        secure: true,
        cookie: { maxAge: days },
        resave: false,
    }
}

/*
isDev = true, erstellt die NuxtJS Umgebung um beim Entwickeln zu Updaten,
isDev = false, erstellt den Produktionsserver, vorher: npm build ausführen 
*/

async start() {
let isDev = true;
this.nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  // Build only in dev mode with hot-reloading
  if (isDev) {
    await build(this.nuxt)
  }
app.use(this.nuxt.render);

console.log("Server wurde erfolgreich erstellt.");
}

loadRoutes() {
    new IndexRoute(app, this);
    new TeamRoute(app, this);
    new ApplyRoute(app, this);
    new LoginRoute(app, this);
    new RegisterRoute(app, this);
    new ProfilRoute(app, this);
    new APIRoute(app, this);  
    new ApplyRoute(app, this);
    new WorldRoute(app, this);
    new UserManagementRoute(app, this);
    new PortfolioRoute(app, this);
}

getSocket() {
    return this.clientSocket;
}

getNuxt() {
    return this.nuxt;
}

getDatabase() {
    return this.database;
}

getBcrypt() {
    return bcrypt;
}

getFileSystem() {
    return fs;
}

}

let server = new Server();
server.start();


module.exports = Server;