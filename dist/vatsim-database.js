"use strict";
var pilot_1 = require('./pilot');
var atc_1 = require('./atc');
var atis_1 = require('./atis');
var vatsim_downloader_1 = require('./vatsim-downloader');
var moment = require('moment');
var VatsimDatabase = (function () {
    function VatsimDatabase(library) {
        this.library = library;
        this.downloader = new vatsim_downloader_1.VatsimDownloader();
        this.startTime = moment();
        this.pilots = [];
        this.atcs = [];
        this.atis = [];
        setTimeout(this.timer.bind(this), 500);
    }
    VatsimDatabase.prototype.timer = function () {
        this.downloader.update(function (clients) {
            var _this = this;
            if (clients) {
                this.pilots = clients.filter(function (c) { return c instanceof pilot_1.Pilot; });
                this.pilots.forEach(function (p) { return p.calculateCustomFields(_this.library); });
                this.atcs = clients.filter(function (c) { return c instanceof atc_1.Atc; });
                this.atis = clients.filter(function (c) { return c instanceof atis_1.Atis; });
            }
            setTimeout(this.timer.bind(this), 5000);
        }.bind(this));
    };
    VatsimDatabase.prototype.listClients = function (mode) {
        return {
            pilots: this.prepareData(this.pilots.map(function (a) { return a.toJson(); }), mode),
            atcs: this.prepareData(this.atcs.map(function (a) { return a.toJson(); }), mode),
            atis: this.prepareData(this.atis.map(function (a) { return a.toJson(); }), mode)
        };
    };
    VatsimDatabase.prototype.listPilots = function (mode) {
        return this.prepareData(this.pilots.map(function (a) { return a.toJson(); }), mode);
    };
    VatsimDatabase.prototype.listAtcs = function (mode) {
        return this.prepareData(this.atcs.map(function (a) { return a.toJson(); }), mode);
    };
    VatsimDatabase.prototype.listAtis = function (mode) {
        return this.prepareData(this.atis.map(function (a) { return a.toJson(); }), mode);
    };
    VatsimDatabase.prototype.prepareData = function (array, mode) {
        if (mode === 'dict') {
            var result = {};
            for (var i = 0; i < array.length; i++) {
                result[array[i].callsign] = array[i];
            }
            return result;
        }
        else {
            return array;
        }
    };
    VatsimDatabase.prototype.getStats = function () {
        return {
            onlinePilots: this.pilots.length,
            onlineAtcs: this.atcs.length,
            onlineAtis: this.atis.length,
            onlineClients: this.pilots.length + this.atcs.length + this.atis.length,
            lastStreamUpdate: this.downloader.lastStreamDate.utc().format(),
            serverTime: moment().utc().format(),
            streamAge: Math.round(moment().diff(this.downloader.lastStreamDate) * 0.001)
        };
    };
    VatsimDatabase.prototype.getServerInfo = function () {
        var pkg = require('../package.json');
        return {
            version: pkg.version,
            started: this.startTime.utc().format(),
            meta: pkg.vatx
        };
    };
    return VatsimDatabase;
}());
exports.VatsimDatabase = VatsimDatabase;
