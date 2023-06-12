import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* Express Server */
import express from 'express';
import session from 'express-session'
import cookieParser from 'cookie-parser'

/* Erstellung der Express Umgebung */
const app = express();
/* Nuxt System */
import { loadNuxt, build } from 'nuxt';

/* HTTPS Server */
import https from 'https'
import cors from 'cors'


/* File System */
import fs from 'fs'

/* Falsche Zertifikate (Während des Development Prozesses) */
const cert = fs.readFileSync(__dirname + "/server/certificates/server.cert");
const key = fs.readFileSync(__dirname + "/server/certificates/server.key");


/* Echte Zertifikate (Während es in der Produktion ist)
const cert = fs.readFileSync("/etc/letsencrypt/live/ABC/fullchain.pem", "ascii");
const key = fs.readFileSync("/etc/letsencrypt/live/ABC/privkey.pem", "ascii"); */


/* Erstellung eines Verschlüsselungssystems */
import bcrypt from 'bcrypt';

/* Datenhaltung */
import Database from './server/dataholder/Database.js'

/* Daten Kommunikation */
import ClientSocket from "./server/socket/ClientSocket.js";

/* Routes */
import IndexRoute from "./server/routing/IndexRoute.js";
import LoginRoute from "./server/routing/LoginRoute.js";
import APIRoute from "./server/routing/APIRoute.js";
import ProfilRoute from "./server/routing/ProfilRoute.js";
import ApplyRoute from "./server/routing/ApplyRoute.js";
import WorldRoute from "./server/routing/WorldRoute.js";
import UserManagementRoute from "./server/routing/UserManagementRoute.js";
import TeamRoute from "./server/routing/TeamRoute.js";
import PortfolioRoute from "./server/routing/PortfolioRoute.js";
import WikiRoute from "./server/routing/WikiRoute.js";
class Server {

constructor() {
    this.database = new Database();

     this.roles = {
         ADMINISTRATOR: {
             Name: "Administrator",
             Id: 3,
         },
         TEAM: {
             Name: "Team",
             Id: 2
         },
         PLAYER: {
             Name: "Player",
             Id: 1,
         }
     };
    this.server = this.configurate();
    this.loadRoutes();

    this.clientSocket = new ClientSocket(25590, "DOMAIN");
}

getRoles() {
    return this.roles;
}

getRolesByName(roleName) {
    for (const [role, roleValue] of Object.entries(this.roles)) {
        if(roleValue.Name === roleName) return roleValue;
    }
    return null;
}

configurate() {
    app.use(session(this.getSessionConfiguration()));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
   // app.use("/_nuxt", express.static("./.nuxt/dist/client"));


return https.createServer({ key: key, cert: cert }, app).listen(3000);
}

getSessionConfiguration() {
    const days = 7 * 1000 * 60 * 60 * 24;
    return {
        secret: "SECRET",
        name: "NAME",
        saveUninitialized: true,
        secure: true,
        cookie: { maxAge: days },
        resave: false,
    }
}

getFolder() {
    return __dirname;
}

/*
isDev = true, erstellt die NuxtJS Umgebung um beim Entwickeln zu Updaten,
isDev = false, erstellt den Produktionsserver, vorher: npm build ausführen 
*/

async start() {
let isDev = true;
this.nuxt = await loadNuxt(isDev ? "dev" : "start");

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
    new ProfilRoute(app, this);
    new APIRoute(app, this);  
    new ApplyRoute(app, this);
    new WorldRoute(app, this);
    new UserManagementRoute(app, this);
    new PortfolioRoute(app, this);
    new WikiRoute(app, this);

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


export default Server;