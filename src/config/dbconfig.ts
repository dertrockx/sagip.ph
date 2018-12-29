import { createConnection } from 'typeorm';
import * as Entities from '../entities';

const connection = app => createConnection({
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  synchronize: true,
  logging: false,
  dropSchema: false,

  username: 'sagipph',
  password: 'sagipph',
  database: 'sagipph',

  entities: [ ...Object.values(Entities) ]
}).then(() => {
  console.log('> Successfully connected to database');

  app();
}).catch(({ code, sqlMessage }) => {
  console.log(`Failure to connect to database: ${sqlMessage} [${code}]`);
});

export default connection;
