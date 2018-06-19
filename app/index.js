var path = require('path');
var fs = require('fs');
var express = require('express');
var serveIndex = require('serve-index')
var app = express();

// Default route
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Serving the  folder
app.use('/static', express.static((path.join(__dirname, '/public'))),
  serveIndex(path.join(__dirname, '/public'), {'icons': true})
);

// Accepting new json documents
app.post('/file-upload', (req, res) => {

    console.log('Post received');

    // Use current as the file name.
    var fileName = new Date().toISOString();

    var body = '';
    filePath = path.join(__dirname, `/public/${fileName}-file.json`);
    req.on('data', function(data) {
        body += data;
    });

    req.on('end', function (){
        fs.appendFile(filePath, body, function() {
            respond.end();
        });
        res.sendStatus(200);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});