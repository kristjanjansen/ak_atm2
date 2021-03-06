var http = require('http');
var ecstatic = require('ecstatic');
var ip = require('ip');

var port = process.argv[2] ? process.argv[2] : 8000
var app = http.createServer(
  ecstatic({ root: __dirname + '/public'})
).listen(port);

var io = require('socket.io')(app);

console.log(
  '\nServer is running\n' +
  'In this machine: http://localhost:' + port + '\n' +
  'In local network: http://' + ip.address() + ':' + port
)
