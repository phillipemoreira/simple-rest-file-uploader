var path = require('path');
var fs = require('fs');
var express = require('express');
var serveIndex = require('serve-index')
var app = express();

// Default route
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/static', express.static((path.join(__dirname, '/public'))),
  serveIndex(path.join(__dirname, '/public/'), {'icons': true})
);

// Accepting new json documents
app.post('/invoice-return', (req, res) => {
    updloadFile(req, res, 'invoice-return')
});

app.post('/picking-return', (req, res) => {
    updloadFile(req, res, 'invoice-return')
});

const updloadFile = (req, res, fileType) => {
    console.log('Post received');

    // Use current as the file name.
    var fileName = new Date().toISOString();

    if (req.headers.requireapikey == "true" && req.headers.apikey !== "1234") {
        res.status(500);
        res.send("Wrong ApiKey");
        return;
    }

    var body = '';
    filePath = path.join(__dirname, `/public/${fileType}/${fileName}-file.json`);
    req.on('data', function(data) {
        body += data;
    });

    req.on('end', function (){
        fs.appendFile(filePath, body, function() {
            res.end();
        });
        res.sendStatus(200);
    });
}

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});