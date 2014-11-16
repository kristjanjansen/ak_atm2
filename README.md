### Installing and running

    git clone https://github.com/kuressaareametikool/atm
    cd atm
    npm install
    node server.js

Alternatively, just clone the project to your local web server and point the browser to 
```public``` subdirectory.

Then, point your browser to the URL shown in terminal output.

Note that you can change the port number: ```node server.js portnumber```.

### Editing

To change ATM states, edit yml and css files in ```/public/banks``` directory.

### Workflow

To update the data files from the local network one can use following script(s):

    var exec = require('child_process').exec

    var path = '/Volumes/dk/Projektid/MK-13/veebitehnoloogiad/'

    setInterval(function() {

    var command1 = 'cp ' + path '*.css public/banks/.'
    var command2 = 'cp ' + path + 'states-* public/banks/. && cat $(ls -t -1 public/banks/states-* | sort) > public/banks/states_all.yml'

    child = exec(command1,
     function (error, stdout, stderr) {
        console.log('Updating files')
        console.log(stdout);
        console.log(stderr);
    });

    }, 3000)