const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

// Client
const clientRequest = function clientRequest(opts) {
    const clientURL = `http://${opts.ip}:${opts.port}/?type=${opts.type}&id=${opts.id}`;
    
    http.get(clientURL, (res) => {
        var body = '';
        res.on('data', d => {
            body += d;
        });

        res.on('end', () => {
            var parsed = JSON.parse(body);
            if (parsed.type == "Complete") {
                callback(parsed);
            } else {
                callback(JSON.parse({type: "Error"}));
            }
        });
    });
}

// SERVER

var _path = "./save-data/api/";

var startServer = function startServer(port) {
    var server = http.createServer(function(request, response) {
        var params = querystring.parse(url.parse(request.url).query);

        response.writeHead(200);        

        // Your process
        // var data = ...

        response.write("{\"data\":\"" + data + "\", \"type\":\"Complete\"}");
        response.end();
    });
    server.listen(port);
    console.log("API Server [> Listening on port :::${port}:::`);
}

var setSavePath = function setSavePath(path) {
    _path = path;
    return this;
}

module.exports = {
    Server: {
        start: startServer,
        savePath: setSavePath
    },
    Client: {
        request: clientRequest
    }
}
