"use strict";
var server_1 = require('./server');
var client_1 = require('./client');
var pilot_1 = require('./pilot');
var atc_1 = require('./atc');
var atis_1 = require('./atis');
var request = require('request');
var moment = require('moment');
var VatsimDownloader = (function () {
    function VatsimDownloader() {
        this.nextServerUpdate = moment();
        this.nextClientUpdate = moment();
        this.serverList = [];
        this.lastStreamDate = moment();
    }
    VatsimDownloader.prototype.update = function (next) {
        this.getServers(function () {
            this.getClients(function (error, clients) {
                if (!error) {
                    console.log(clients.length + ' clients.');
                    next(clients);
                }
                else {
                    next();
                }
            }.bind(this));
        }.bind(this));
    };
    VatsimDownloader.prototype.getClients = function (next) {
        if (this.nextClientUpdate.isSameOrBefore(moment())) {
            var shuffledServerList = this.shuffleServerList();
            console.log('Client update from ' + shuffledServerList[0].url);
            this.getTextfile(shuffledServerList[0].url, function (error, lines) {
                if (!error) {
                    var clients = [];
                    var clientZone = false;
                    for (var i in lines) {
                        if (lines[i].indexOf('UPDATE = ') === 0) {
                            var date = lines[i].substr(9).trim();
                            this.lastStreamDate = moment(date + ' +0000', "YYYYMMDDHHmmss Z");
                        }
                        if (lines[i].indexOf('!SERVERS:') === 0 || lines[i].indexOf('!PREFILE:') === 0)
                            clientZone = false;
                        if (lines[i].indexOf(';') !== 0 && clientZone) {
                            clients.push(this.getClient(lines[i]));
                        }
                        if (lines[i].indexOf('!CLIENTS:') === 0) {
                            clientZone = true;
                        }
                    }
                    this.nextClientUpdate = moment().add(1, 'minute');
                    next(null, clients);
                }
                else {
                    this.nextClientUpdate = moment().add(1, 'minute');
                    console.log('Failed to get client list. Will retry in 1 minute.');
                    next(true);
                }
            }.bind(this));
        }
        else {
            next(true);
        }
    };
    VatsimDownloader.prototype.getServers = function (next) {
        if (this.nextServerUpdate.isSameOrBefore(moment())) {
            this.getTextfile('http://status.vatsim.net/', function (error, servers) {
                if (!error) {
                    this.serverList = servers.filter(function (s) { return s.indexOf('url0=') === 0; }).map(function (s) { return new server_1.Server(s.substr(5)); });
                    console.log('Server list downloaded successfully: ' + this.serverList.length + ' data servers available.');
                    this.nextServerUpdate = moment().add(1, 'day');
                }
                else {
                    console.log('Failed to get server list. Will retry in 5 minutes.');
                    this.nextServerUpdate = moment().add(5, 'minutes');
                }
                next();
            }.bind(this));
        }
        else {
            next();
        }
    };
    VatsimDownloader.prototype.getTextfile = function (url, callback) {
        request.get({ url: url, timeout: 10000 }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, body.replace(/\r/g, '').split('\n'));
            }
            else {
                callback(error);
            }
        });
    };
    VatsimDownloader.prototype.shuffleServerList = function () {
        var _this = this;
        var temporaryServerList = [];
        var indices = this.serverList.map(function (e, i) {
            return i;
        });
        while (indices.length > 0) {
            var k = Math.floor(Math.random() * indices.length);
            temporaryServerList.push(indices.splice(k, 1));
        }
        return temporaryServerList.map(function (i) {
            return _this.serverList[i];
        });
    };
    VatsimDownloader.prototype.getClient = function (input) {
        var fields = input.split(':');
        console.log;
        if (fields[3] === 'PILOT') {
            return new pilot_1.Pilot(fields[0], fields[1], fields[2], fields[3], fields[4], parseFloat(fields[5]), parseFloat(fields[6]), fields[7], parseInt(fields[8]), fields[9], parseInt(fields[10]), fields[11], fields[12], fields[13], fields[14], parseInt(fields[15]), parseInt(fields[16]), fields[17], parseInt(fields[18]), parseInt(fields[19]), fields[20], fields[21], fields[22], fields[23], fields[24], fields[25], fields[26], fields[27], fields[28], fields[29], fields[30], parseFloat(fields[31]), parseFloat(fields[32]), parseFloat(fields[33]), parseFloat(fields[34]), fields[35], moment(fields[36] + ' Z', 'YYYYMMDDHHmmss Z'), moment(fields[37] + ' Z', 'YYYYMMDDHHmmss Z'), parseInt(fields[38]), parseFloat(fields[39]), parseFloat(fields[40]));
        }
        else if (fields[3] === 'ATC' && fields[0].indexOf('_ATIS') === fields[0].length - 5) {
            return new atis_1.Atis(fields[0], fields[1], fields[2], fields[3], fields[4], parseFloat(fields[5]), parseFloat(fields[6]), fields[7], parseInt(fields[8]), fields[9], parseInt(fields[10]), fields[11], fields[12], fields[13], fields[14], parseInt(fields[15]), parseInt(fields[16]), fields[17], parseInt(fields[18]), parseInt(fields[19]), fields[20], fields[21], fields[22], fields[23], fields[24], fields[25], fields[26], fields[27], fields[28], fields[29], fields[30], parseFloat(fields[31]), parseFloat(fields[32]), parseFloat(fields[33]), parseFloat(fields[34]), fields[35], moment(fields[36] + ' Z', 'YYYYMMDDHHmmss Z'), moment(fields[37] + ' Z', 'YYYYMMDDHHmmss Z'), parseInt(fields[38]), parseFloat(fields[39]), parseFloat(fields[40]));
        }
        else if (fields[3] === 'ATC') {
            return new atc_1.Atc(fields[0], fields[1], fields[2], fields[3], fields[4], parseFloat(fields[5]), parseFloat(fields[6]), fields[7], parseInt(fields[8]), fields[9], parseInt(fields[10]), fields[11], fields[12], fields[13], fields[14], parseInt(fields[15]), parseInt(fields[16]), fields[17], parseInt(fields[18]), parseInt(fields[19]), fields[20], fields[21], fields[22], fields[23], fields[24], fields[25], fields[26], fields[27], fields[28], fields[29], fields[30], parseFloat(fields[31]), parseFloat(fields[32]), parseFloat(fields[33]), parseFloat(fields[34]), fields[35], moment(fields[36] + ' Z', 'YYYYMMDDHHmmss Z'), moment(fields[37] + ' Z', 'YYYYMMDDHHmmss Z'), parseInt(fields[38]), parseFloat(fields[39]), parseFloat(fields[40]));
        }
        else {
            return new client_1.Client(fields[0], fields[1], fields[2], fields[3], fields[4], parseFloat(fields[5]), parseFloat(fields[6]), fields[7], parseInt(fields[8]), fields[9], parseInt(fields[10]), fields[11], fields[12], fields[13], fields[14], parseInt(fields[15]), parseInt(fields[16]), fields[17], parseInt(fields[18]), parseInt(fields[19]), fields[20], fields[21], fields[22], fields[23], fields[24], fields[25], fields[26], fields[27], fields[28], fields[29], fields[30], parseFloat(fields[31]), parseFloat(fields[32]), parseFloat(fields[33]), parseFloat(fields[34]), fields[35], moment(fields[36] + ' Z', 'YYYYMMDDHHmmss Z'), moment(fields[37] + ' Z', 'YYYYMMDDHHmmss Z'), parseInt(fields[38]), parseFloat(fields[39]), parseFloat(fields[40]));
        }
    };
    return VatsimDownloader;
}());
exports.VatsimDownloader = VatsimDownloader;
