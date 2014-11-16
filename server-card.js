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

var pcsc = require('node-pcsc')
var list = require('./node_modules/node-pcsc/lib/smcard-list.js')

pcsc.init();

  pcsc.on('evt', function(evt) {

io.on('connection', function (socket) {
  
    console.log(evt)
    console.log(list.list[evt.card.ATR])
  	if (Object.keys(evt.card).length !== 0 && evt.reader.status == 'SCARD_STATE_PRESENT') {
  	  socket.emit('message', { status: 'card_in', card: list.list[evt.card.ATR] });
  	} else if (evt.reader.status == 'SCARD_STATE_EMPTY') {
  	  socket.emit('message', { status: 'card_out'});
  	}
  });

});