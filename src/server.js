
var express = require('express');
var config = require('./config');
var https = require('http');

var port = config.port;

if(!port){
    port = 80;
    console.warn('Port not defined - defaulting to ' + port);
}

var app = express();

app.get('/', function(req,res){
    var backendHost = config.backendHost;
    var backendPort = config.backendPort;
    var model = {
        frontend: 'hello'
    };
    if(!backendHost){
        model.backend = 'not configured';
        res.json(model);
        return;
    }
    if(!backendPort){
        backendPort = 8080;
        console.warn("Backend port not defined, defaulting to "+backendPort);
    }
    var backendRequest = https.request({protocol:'http:', hostname: backendHost, port: backendPort, method: 'GET'}, function(response){
        var result = "";
        response.on('data', function(chunk){
            result += chunk;
        });

        response.on('end', function(){
            model.backend = JSON.parse(result);
            res.json(model);
        });
    });

    backendRequest.on('error', function(err){
        console.error(err);
        model.error = err;
        res.json(model);
    });

    backendRequest.end();
});

console.log('binding to port: '+port);
app.listen(port);
