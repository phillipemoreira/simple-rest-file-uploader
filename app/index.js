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
    console.log('POST RECEIVED');
    var tmp_path = req.files.thumbnail.path;
    var target_path = path.join(__dirname, '/public/') + req.files.thumbnail.name;
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
   });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});