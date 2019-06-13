const Sequelize = require('sequelize');

const instance = 'dinify:europe-west1:api';
const dbName = 'production';
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
  sequelize = new Sequelize(dbName, dbUser, dbPass, {
    dialect: 'mysql',
    host: '127.0.0.1',
    logging: false
  });
}

module.exports = sequelize;
