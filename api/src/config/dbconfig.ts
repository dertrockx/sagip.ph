import { createConnection } from 'typeorm';
import * as Entities from '@models';

const connection = () => createConnection({
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
});

export default connection;
