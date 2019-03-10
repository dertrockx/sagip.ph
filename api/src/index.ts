import 'reflect-metadata';

import connection from './config/dbconfig';
import App from './app';

connection()
  .then(() => {
    console.log('> Successfully connected to database');
    
    const server = new App();
    server.start();
  })
  .catch(({ code, sqlMessage }) => {
    console.log(`Failure to connect to database: ${sqlMessage} [${code}]`);
  });
