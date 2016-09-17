"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var client_1 = require('./client');
var Atc = (function (_super) {
    __extends(Atc, _super);
    function Atc(data, streamDate) {
        _super.call(this, data, streamDate);
    }
    Atc.prototype.toJson = function () {
        return {
            callsign: this.callsign,
            cid: this.cid,
            realname: this.realname,
            frequency: this.frequency,
            latitude: this.latitude,
            longitude: this.longitude,
            altitude: this.altitude,
            server: this.server,
            protrevision: this.protrevision,
            rating: this.rating,
            facilitytype: this.facilitytype,
            visualrange: this.visualrange,
            atis_message: this.atis_message,
            time_last_atis_received: this.time_last_atis_received,
            time_logon: this.time_logon,
            last_update_from_stream: this.last_update_from_stream
        };
    };
    return Atc;
}(client_1.Client));
exports.Atc = Atc;
