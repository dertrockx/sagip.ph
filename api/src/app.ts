import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as socketIo from 'socket.io';

import { createServer, Server } from 'http';
import { getRepository } from 'typeorm';
import * as expressSession from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import events from './events';
import { Session, Distress } from '@models';

import router from './router';

class App {
  public app: express.Express;
  public port: number;
  public sessionRepository = getRepository(Session);
  public connections: object;

  private server: Server;
  private io: any;

  constructor() {
    this.app = express();
    this.port = this._setPort();

    this.server = createServer(this.app);
    this.io = socketIo(this.server);
    this.connections = {};
    
    this._configureServer();
    this._setRoutes();
    this._prepareSockets();

    if (process.env.NODE_ENV === 'production') {
      this._setupCron();
    }
  }

  public start = (): void => {
    this.server.listen(this.port, (err: any): void => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(`> Listening on port ${this.port}`);
    });
  }

  private _prepareSockets = (): void => {
    this.io.on(events.CONNECT, (socket: any) => {
      this.connections[socket.id] = { socket };
      console.log(`SOCKET ${socket.id} has connected`);

      socket.on(events.DISTRESS_WATCH, payload => {
        this.connections[socket.id].data = JSON.parse(payload);
        console.log(`SOCKET ${socket.id} enabled real-time distress update`);
      });

      socket.on(events.DETACH_WATCH, () => {
        const sock = this.connections[socket.id];

        if (sock.hasOwnProperty('data')) {
          sock.data = null;
        }
      });

      socket.on(events.DISCONNECT, () => {
        delete this.connections[socket.id];
        console.log(`SOCKET ${socket.id} has disconnected`);
      });
    });
  }

  private _configureServer = (): void => {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(logger('dev'));

    this.app.use(cors({
      credentials: true,
      origin: process.env.ENVIRONMENT === 'production' ? 'https://api.sagip.ph' : 'http://localhost:3000',
    }));

    this.app.use(expressSession({
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        ttl: 86400
      }).connect(this.sessionRepository),
      secret: 'sagipsagip'
    }));

    this.app.use((req, _, next) => {
      req.socket = this.io;
      (<any> req).connections = this.connections;

      next();
    });
  }

  private _setPort = (): number => +process.env.PORT || 8081;

  private _setRoutes = (): void => {
    this.app.use('/v1/', router);
    this.app.use(express.static(__dirname + '/../public'));
  }

  private _setupCron = (): void => {
    setInterval(() => {
      // Purge distress with 2 and half day age
      Distress.purge();
    }, 1000 * 60);
  }
}

export default App;
