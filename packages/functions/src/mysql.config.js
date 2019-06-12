const Sequelize = require('sequelize');

const instance = 'dinify:europe-west1:api';
const dbName = 'production';
const dbUser = 'api';
const dbPass = '7XWsCgpqqEPWLFL';

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    dialect: 'mysql',
    host: '/cloudsql/'+instance,
    timestamps: false,
    dialectOptions: {
      socketPath: '/cloudsql/'+instance
  },
});

module.exports = sequalize;
