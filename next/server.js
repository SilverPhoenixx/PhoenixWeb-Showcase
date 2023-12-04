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

/* Next System */
import next from 'next';

/* HTTPS Server */
import https from 'https'
import cors from 'cors'


/* File System */
import fs from 'fs'

/* Falsche Zertifikate (Während des Development Prozesses)
const cert = fs.readFileSync(__dirname + "/backend/certificates/server.crt");
const key = fs.readFileSync(__dirname + "/backend/certificates/server.key");
const passphrase = "RomanStinkt";
*/


/* Echte Zertifikate (Während es in der Produktion ist) */
const cert = fs.readFileSync("/etc/letsencrypt/live/EXAMPLE/fullchain.pem", "ascii");
const key = fs.readFileSync("/etc/letsencrypt/live/EXAMPLE/privkey.pem", "ascii");


/* Erstellung eines Verschlüsselungssystems */
import bcrypt from 'bcrypt';

/* Datenhaltung */
import Database from './backend/dataholder/Database.js'

/* Daten Kommunikation */
import ClientSocket from "./backend/socket/ClientSocket.js";

/* Routes */
import IndexRoute from "./backend/routes/IndexRoute.js";
import LoginRoute from "./backend/routes/LoginRoute.js";
import APIRoute from "./backend/routes/APIRoute.js";
import ProfilRoute from "./backend/routes/ProfilRoute.js";
import ApplyRoute from "./backend/routes/ApplyRoute.js";
import WorldRoute from "./backend/routes/WorldRoute.js";
import UserManagementRoute from "./backend/routes/UserManagementRoute.js";
import TeamRoute from "./backend/routes/TeamRoute.js";
import PortfolioRoute from "./backend/routes/PortfolioRoute.js";
import WikiRoute from "./backend/routes/WikiRoute.js";
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
        this.clientSocket = new ClientSocket(25590, "EXAMPLE");
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

        return https.createServer({ key: key, cert: cert }, app).listen(3000);
    }

    getSessionConfiguration() {
        const days = 7 * 1000 * 60 * 60 * 24;
        return {
            secret: "EXAMPLE",
            name: "EXAMPLE",
            saveUninitialized: true,
            secure: true,
            cookie: { maxAge: days },
            resave: false,
        }
    }

    getFolder() {
        return __dirname;
    }

    async start() {
        const dev = false;
        this.next = await next({dir: "./frontend", dev });
        const handle = this.next.getRequestHandler();

        app.get('*', (req, res) => {
            return handle(req, res);
        });

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

    getNext() {
        return this.next;
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
await server.start();


export default Server;