import {Request, Response} from "express";
import * as Express from "express";
import * as Compression from 'compression';
import { VatsimDatabase } from './vatsim-database';

var App = Express();
App.use(Compression());
var port = process.argv[2] || 80;

var vatsim = new VatsimDatabase();

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
function reply(res: Response, output: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(output));
}

App.listen(port, function () {
  console.log('Server listening on ports ' + port);
});