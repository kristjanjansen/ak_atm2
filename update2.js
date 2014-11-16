var exec = require('child_process').exec

var path = '/Volumes/dk/Projektid/MK-13/veebitehnoloogiad/'

setInterval(function() {

child = exec('cp ' + path + 'states-* data/. && cat $(ls -t -1 data/states-* | sort) > data/states_all.yml',
  function (error, stdout, stderr) {
  	console.log('Updating state files')
    console.log(stdout);
    console.log(stderr);
});

}, 3000)