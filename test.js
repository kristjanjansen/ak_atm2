var pcsc = require('node-pcsc')
var list = require('./node_modules/node-pcsc/lib/smcard-list.js')

pcsc.init();

  pcsc.on('evt', function(evt) {
    console.log(evt)
});