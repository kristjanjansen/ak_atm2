var exec = require('child_process').exec

setInterval(function() {

child = exec('cp /Volumes/dk/Projektid/MK-13/veebitehnoloogiad/*.css data/.',
  function (error, stdout, stderr) {
  	console.log('Updating files')
    console.log(stdout);
    console.log(stderr);
});

}, 3000)