import {Request, Response} from "express";
import * as Express from "express";
var App = Express();

App.get('/', function (req, res) {
  res.send('vatx - server');
});

App.listen(80, function () {
  console.log('Server listening on port 80.');
});