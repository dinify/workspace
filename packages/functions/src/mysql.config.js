const Sequelize = require('sequelize');

const instance = 'dinify:europe-west1:api';
let dbName = 'production';
const dbUser = 'api';
const dbPass = '7XWsCgpqqEPWLFL';

let sequelize;

if ((process.env.NODE_ENV || '').trim() === 'production') { // prod
  sequelize = new Sequelize(dbName, dbUser, dbPass, {
    dialect: 'mysql',
    host: '/cloudsql/'+instance,
    logging: false,
    dialectOptions: {
      socketPath: '/cloudsql/'+instance
    }
  });
} else { // dev
  dbName = 'production';
  sequelize = new Sequelize(dbName, dbUser, dbPass, {
    dialect: 'mysql',
    port: 3307,
    host: '127.0.0.1',
    logging: console.log
  });
}

module.exports = sequelize;
