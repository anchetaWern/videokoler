var express = require('express');
var express_peer_server = require('peer').ExpressPeerServer;
var peer_options = {
    debug: true
};

var app = express();

var server = app.listen(3000);

app.use('/peerjs', express_peer_server(server, peer_options));
