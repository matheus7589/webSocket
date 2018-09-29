
var app =  require('../src/app');
var connection = require('../src/database');
var server = require('http').createServer(app).listen(4555)
, io = require('socket.io').listen(server)
, bodyParser = require('body-parser');

 server.listen(4555, function(){
   console.log("webSocket na porta 4555");
 });
 
 // Socket ---------------------------------------

var emitir = function(req, res, next){
	var notificar = req.body || '';
		if(notificar != '')	 {
			io.emit('notificacao', notificar);
			next();
		} else {
			next();
		}
};
 app.use(emitir);

var clients = {};

io.sockets.on('connection', function (socket) {

	socket.on('join', function (data) {
		var sql = '';
        clients[socket.id] = {
            nome: data.nome,
            cod_matriz: data.cod_matriz,
            cod_empresa: data.cod_empresa
        };
        //console.log(clients);
		// console.log('Join');
		console.log('Listando dados');
		connection.getConnection(function(error, tempCont){
			if(!!error){
				console.log('Erro na query');
			}else{
				console.log('Sucesso');
				if(data.cod_matriz == null){
                    sql = 'SELECT * from empresa WHERE codMatriz = ' + data.cod_empresa;
                }

				tempCont.query(sql, function(error, rows, fields){
					if(!!error){
						console.log('erro na query');
					}else{
						console.log(rows);
						return;
					}
                    tempCont.release();
				});
			}
		});
		
    });

	socket.on('ping', function (data) {
		console.log('pingando', data);
	});
	
	socket.on('eventsToRetaguarda', function(data){
		console.log(data);
		socket.emit('events', data);
	});
	
	socket.on('eventsToApi', function(data){
		console.log(data);
		socket.emit('notificacao', data);
	});
	
	socket.on('disconnect', function(){
        console.log('user disconnected');
        delete clients[socket.id];
    });
  
});

// Socket ---------------------------------------
