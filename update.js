var exec = require('child_process').exec

setInterval(function() {

child = exec('./update.sh',
  function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
});

}, 3000)