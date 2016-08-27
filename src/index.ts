import {Request, Response} from "express";
import * as Express from "express";
var App = Express();

var port = process.argv [2] || 80;

App.get('/', function (req, res) {
  res.send('vatx - server');
});

App.listen(port, function () {
  console.log('Server listening on port ' + port);
});