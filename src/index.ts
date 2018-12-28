import 'reflect-metadata';

import connection from './config/dbconfig';
import App from './app';

const server = new App();
connection(server.start);
