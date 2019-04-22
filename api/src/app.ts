import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as cors from 'cors';

import { getRepository } from 'typeorm';
import * as expressSession from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { Session } from '@models';

import router from './router';

class App {
  public app: express.Express;
  public port: number;
  public sessionRepository = getRepository(Session);

  constructor() {
    this.app = express();
    this.port = this._setPort();
    
    this._configureServer();
    this._setRoutes();
  }

  public start = (): void => {
    this.app.listen(this.port, (err: any): void => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(`> Listening on port ${this.port}`);
    });
  }

  private _configureServer = (): void => {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(logger('dev'));

    this.app.use(cors({
      credentials: true,
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
    }));

    this.app.use(expressSession({
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        ttl: 86400
      }).connect(this.sessionRepository),
      secret: 'sagipsagip'
    }));
  }

  private _setPort = (): number => +process.env.PORT || 8081;

  private _setRoutes = (): void => {
    this.app.use('/v1/', router);
    this.app.use(express.static(__dirname + '/../public'));
  }
}

export default App;
