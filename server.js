var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const opn = require('opn')
    opn('index.html')
    res.end('Hello World. I"m alive!!!!!\n');
}).listen(port);
