var io = require('socket.io-client');
var socket = io.connect('http://localhost:4555/');


socket.on('connect', function () {
    var empresa = {};
    empresa.nome = 'Matheus';
    empresa.cod_matriz = null;
    empresa.cod_empresa = 4564;
    socket.emit("join", empresa);
});
  
socket.on('events', function(msg) {
  console.log('Emitiu evento no cliente');
});