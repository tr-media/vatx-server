"use strict";
var Express = require("express");
var Compression = require('compression');
var vatsim_database_1 = require('./vatsim-database');
var App = Express();
App.use(Compression());
var port = process.argv[2] || 80;
var vatsim = new vatsim_database_1.VatsimDatabase();
App.get('/', function (req, res) {
    res.send('<h1>vatx - server</h1><ul>  <li><a href="/stats">/stats</a></li>  <li><a href="/clients">/clients</a></li>  <li><a href="/pilots">/pilots</a></li>  <li><a href="/atcs">/atcs</a></li>  <li><a href="/atis">/atis</a></li></ul>');
});
App.get('/clients', function (req, res) {
    reply(res, vatsim.listClients());
});
App.get('/pilots', function (req, res) {
    reply(res, vatsim.listPilots());
});
App.get('/atcs', function (req, res) {
    reply(res, vatsim.listAtcs());
});
App.get('/atis', function (req, res) {
    reply(res, vatsim.listAtis());
});
App.get('/stats', function (req, res) {
    reply(res, vatsim.getStats());
});
function reply(res, output) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(output));
}
App.listen(port, function () {
    console.log('Server listening on ports ' + port);
});
