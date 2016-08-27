"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var client_1 = require('./client');
var Atc = (function (_super) {
    __extends(Atc, _super);
    function Atc(callsign, cid, realname, clienttype, frequency, latitude, longitude, altitude, groundspeed, planned_aircraft, planned_tascruise, planned_depairport, planned_altitude, planned_destairport, server, protrevision, rating, transponder, facilitytype, visualrange, planned_revision, planned_flighttype, planned_deptime, planned_actdeptime, planned_hrsenroute, planned_minenroute, planned_hrsfuel, planned_minfuel, planned_altairport, planned_remarks, planned_route, planned_depairport_lat, planned_depairport_lon, planned_destairport_lat, planned_destairport_lon, atis_message, time_last_atis_received, time_logon, heading, QNH_iHg, QNH_Mb) {
        _super.call(this, callsign, cid, realname, clienttype, frequency, latitude, longitude, altitude, groundspeed, planned_aircraft, planned_tascruise, planned_depairport, planned_altitude, planned_destairport, server, protrevision, rating, transponder, facilitytype, visualrange, planned_revision, planned_flighttype, planned_deptime, planned_actdeptime, planned_hrsenroute, planned_minenroute, planned_hrsfuel, planned_minfuel, planned_altairport, planned_remarks, planned_route, planned_depairport_lat, planned_depairport_lon, planned_destairport_lat, planned_destairport_lon, atis_message, time_last_atis_received, time_logon, heading, QNH_iHg, QNH_Mb);
        this.callsign = callsign;
        this.cid = cid;
        this.realname = realname;
        this.frequency = frequency;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.server = server;
        this.protrevision = protrevision;
        this.rating = rating;
        this.facilitytype = facilitytype;
        this.visualrange = visualrange;
        this.atis_message = atis_message;
        this.time_last_atis_received = time_last_atis_received;
        this.time_logon = time_logon;
    }
    return Atc;
}(client_1.Client));
exports.Atc = Atc;
