const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'Ruggu@123',
      database : 'zpl'
    }
  });

module.exports = knex;
