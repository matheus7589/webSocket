var mysql = require('mysql');

var connection = mysql.createPool({
	connectionLimit: 50,
	host: '54.233.175.231',
	user: 'development_user',
	password: '3bk9fvyi',
	database: 'gestor_db',
});

module.exports = connection;