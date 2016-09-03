"use strict";
var Express = require("express");
var Compression = require('compression');
var vatsim_database_1 = require('./vatsim-database');
var library_1 = require('./library');
var App = Express();
App.use(Compression());
var port = process.argv[2] || 80;
var vatsim = new vatsim_database_1.VatsimDatabase();
var library = new library_1.Library();
App.get('/', function (req, res) {
    res.send('<h1>vatx - server</h1><ul>  <li><a href="/stats">/stats</a></li>  <li><a href="/clients">/clients</a></li>  <li><a href="/pilots">/pilots</a></li>  <li><a href="/atcs">/atcs</a></li>  <li><a href="/atis">/atis</a></li>  <li><a href="/airport/eddt">/airport/eddt</a></li>  <li><a href="/atis">/atis</a></li>  </ul>  <p><small>Version: ' + vatsim.getServerInfo().version + ' - up since ' + vatsim.getServerInfo().started + '</small></p>');
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
App.get('/airports', function (req, res) {
    reply(res, library.getAirports());
});
App.get('/airport/:id', function (req, res) {
    if (req.params.id) {
        var airport = library.getAirport(req.params.id.toLowerCase());
        if (airport) {
            reply(res, airport);
            return;
        }
    }
    fail(res);
});
function reply(res, output) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(output));
}
function fail(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send('Not found');
}
App.listen(port, function () {
    console.log('Server listening on ports ' + port);
});
