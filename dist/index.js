"use strict";
var Express = require("express");
var App = Express();
App.get('/', function (req, res) {
    res.send('Hello World!');
});
App.listen(80, function () {
    console.log('Example app listening on port 80!');
});
