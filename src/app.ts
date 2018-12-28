import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';

import router from './router';

class App {
  public app: express.Express;
  public port: number;

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
  }

  private _setPort = (): number => +process.env.PORT || 8081;

  private _setRoutes = (): void => {
    this.app.use('/api', router);
  }
}

export default App;
