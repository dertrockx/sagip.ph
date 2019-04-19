import 'reflect-metadata';
import * as dotenv from 'dotenv';

import connection from './config/dbconfig';
import App from './app';

dotenv.config();

connection()
  .then(() => {
    console.log('> Successfully connected to database');
    
    const server = new App();
    server.start();
  })
  .catch(({ code, sqlMessage }) => {
    console.log(`Failure to connect to database: ${sqlMessage} [${code}]`);
  });
