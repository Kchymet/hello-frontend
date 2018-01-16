
var express = require('express');
var config = require('./config');

var app = express();

app.get('/', function(req,res){
    var backend = config.backendHost;
    var model = {
        frontend: 'hello'
    };
    if(!backend){
        model.backend = 'not configured';
    }
    res.json(model);
});

app.listen(80);