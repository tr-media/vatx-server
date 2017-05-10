"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var Compression = require("compression");
var vatsim_database_1 = require("./vatsim-database");
var library_1 = require("./library");
var commandLineArgs = require("command-line-args");
var request = require("request");
var ipaddr = require('ipaddr.js');
var querystring = require("querystring");
var ua = require('universal-analytics');
var md5 = require('md5');
var options = commandLineArgs([
    { name: 'port', alias: 'p', type: Number },
    { name: 'gaid', type: String }
]);
var App = Express();
App.use(Compression());
var port = options.port || 80;
var library = new library_1.Library();
var vatsim = new vatsim_database_1.VatsimDatabase(library);
App.get('/', function (req, res) {
    var client = getClientInfo(req);
    res.setHeader('x-vatx-client-ip', client.ip);
    res.setHeader('x-vatx-client-cid', client.cid);
    res.setHeader('Access-Control-Allow-Headers', 'x-vatx-client-cid');
    res.send('<h1>vatx - server</h1><ul>  <li><a href="/stats">/stats</a></li>  <li><a href="/clients">/clients</a></li>  <li><a href="/pilots">/pilots</a></li>  <li><a href="/atcs">/atcs</a></li>  <li><a href="/atis">/atis</a></li>  <li><a href="/airports">/airports</a></li>  <li><a href="/airport/eddt">/airport/eddt</a></li>  <li><a href="/airlines">/airlines</a></li>  <li><a href="/airline/dlh">/airline/dlh</a></li>  </ul>  <p><small>Version: ' + vatsim.getServerInfo().version + ' - up since ' + vatsim.getServerInfo().started + '</small></p>');
    track(req);
});
App.get('/clients', function (req, res) {
    reply(res, vatsim.listClients(req.query.mode));
    track(req);
});
App.get('/pilots', function (req, res) {
    reply(res, vatsim.listPilots(req.query.mode));
    track(req);
});
App.get('/atcs', function (req, res) {
    reply(res, vatsim.listAtcs(req.query.mode));
    track(req);
});
App.get('/atis', function (req, res) {
    reply(res, vatsim.listAtis(req.query.mode));
    track(req);
});
App.get('/stats', function (req, res) {
    reply(res, vatsim.getStats());
    track(req);
});
App.get('/about', function (req, res) {
    reply(res, vatsim.getServerInfo());
    track(req);
});
App.get('/airports', function (req, res) {
    reply(res, library.getAirports(req.query.mode, req.query.all));
    track(req);
});
App.get('/airport/:id', function (req, res) {
    if (req.params.id) {
        var airport = library.getAirport(req.params.id);
        if (airport) {
            reply(res, airport);
            track(req);
            return;
        }
    }
    fail(res);
    track(req);
});
App.get('/airlines', function (req, res) {
    reply(res, library.getAirlines(req.query.mode));
    track(req);
});
App.get('/airline/:id', function (req, res) {
    if (req.params.id) {
        var airport = library.getAirline(req.params.id);
        if (airport) {
            reply(res, airport);
            track(req);
            return;
        }
    }
    fail(res);
    track(req);
});
App.get('/find', function (req, res) {
    reply(res, library.find(req.query.q));
    track(req);
});
App.options('/*', function (req, res) {
    reply(res, {});
    track(req);
});
function reply(res, output) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'x-vatx-client-cid');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(output));
}
function fail(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'x-vatx-client-cid');
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send('Not found');
}
function track(req) {
    if (options.gaid) {
        var userAgent = req.headers['user-agent'];
        var documentPath = req.path;
        var client = getClientInfo(req);
        var body = querystring.stringify({
            v: 1,
            t: "pageview",
            dp: documentPath,
            ua: userAgent,
            uip: client.ip,
            aip: 1,
            tid: options.gaid,
            cid: client.cid
        });
        request.post('https://www.google-analytics.com/collect', {
            body: body
        });
    }
}
function getClientInfo(req) {
    var src = req.connection.remoteAddress;
    if (req.headers.hasOwnProperty('x-forwarded-for')) {
        var ips = req.headers['x-forwarded-for'].split(',').filter(function (i) { return i; });
        if (ips.length > 0) {
            src = ips[ips.length - 1].trim();
        }
    }
    var clientIp = '0.0.0.0';
    if (ipaddr.IPv4.isValid(src)) {
        clientIp = src;
    }
    else if (ipaddr.IPv6.isValid(src)) {
        var ip = ipaddr.IPv6.parse(src);
        if (ip.isIPv4MappedAddress()) {
            clientIp = ip.toIPv4Address().toString();
        }
        else {
            clientIp = src;
        }
    }
    var cid;
    if (req.headers.hasOwnProperty('x-vatx-client-cid')) {
        cid = req.headers['x-vatx-client-cid'];
    }
    else {
        cid = md5(req.connection.remoteAddress + req.headers['user-agent']);
    }
    return {
        ip: clientIp,
        cid: cid
    };
}
App.listen(port, function () {
    console.log('Server listening on port ' + port);
});
