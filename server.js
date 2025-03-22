var express = require('express');
var path = require('path');
var app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function() {
    console.log('Server started at port ' + port);
});

