"use strict";
var pilot_1 = require('./pilot');
var atc_1 = require('./atc');
var atis_1 = require('./atis');
var vatsim_downloader_1 = require('./vatsim-downloader');
var moment = require('moment');
var VatsimDatabase = (function () {
    function VatsimDatabase() {
        this.downloader = new vatsim_downloader_1.VatsimDownloader();
        this.pilots = [];
        this.atcs = [];
        this.atis = [];
        setTimeout(this.timer.bind(this), 500);
    }
    VatsimDatabase.prototype.timer = function () {
        this.downloader.update(function (clients) {
            if (clients) {
                this.pilots = clients.filter(function (c) { return c instanceof pilot_1.Pilot; });
                this.atcs = clients.filter(function (c) { return c instanceof atc_1.Atc; });
                this.atis = clients.filter(function (c) { return c instanceof atis_1.Atis; });
            }
            setTimeout(this.timer.bind(this), 5000);
        }.bind(this));
    };
    VatsimDatabase.prototype.listClients = function () {
        return {
            pilots: this.pilots,
            atcs: this.atcs,
            atis: this.atis
        };
    };
    VatsimDatabase.prototype.listPilots = function () {
        return this.pilots;
    };
    VatsimDatabase.prototype.listAtcs = function () {
        return this.atcs;
    };
    VatsimDatabase.prototype.listAtis = function () {
        return this.atis;
    };
    VatsimDatabase.prototype.getStats = function () {
        return {
            OnlinePilots: this.pilots.length,
            OnlineAtcs: this.atcs.length,
            OnlineAtis: this.atis.length,
            OnlineClients: this.pilots.length + this.atcs.length + this.atis.length,
            LastStreamUpdate: this.downloader.lastStreamDate.utc().format(),
            ServerTime: moment().utc().format(),
            StreamAge: Math.round(moment().diff(this.downloader.lastStreamDate) * 0.001)
        };
    };
    return VatsimDatabase;
}());
exports.VatsimDatabase = VatsimDatabase;
