var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('./www'));

app.use('/', function(req, res){
	res.sendFile(path.resolve('Index.html'))
});

var port = 3000;

app.listen(port, function(error){
	if(error) throw error;
	console.log("Express server listing on port", port)
});