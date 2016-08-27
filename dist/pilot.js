"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var client_1 = require('./client');
var Pilot = (function (_super) {
    __extends(Pilot, _super);
    function Pilot(callsign, cid, realname, clienttype, frequency, latitude, longitude, altitude, groundspeed, planned_aircraft, planned_tascruise, planned_depairport, planned_altitude, planned_destairport, server, protrevision, rating, transponder, facilitytype, visualrange, planned_revision, planned_flighttype, planned_deptime, planned_actdeptime, planned_hrsenroute, planned_minenroute, planned_hrsfuel, planned_minfuel, planned_altairport, planned_remarks, planned_route, planned_depairport_lat, planned_depairport_lon, planned_destairport_lat, planned_destairport_lon, atis_message, time_last_atis_received, time_logon, heading, QNH_iHg, QNH_Mb) {
        _super.call(this, callsign, cid, realname, clienttype, frequency, latitude, longitude, altitude, groundspeed, planned_aircraft, planned_tascruise, planned_depairport, planned_altitude, planned_destairport, server, protrevision, rating, transponder, facilitytype, visualrange, planned_revision, planned_flighttype, planned_deptime, planned_actdeptime, planned_hrsenroute, planned_minenroute, planned_hrsfuel, planned_minfuel, planned_altairport, planned_remarks, planned_route, planned_depairport_lat, planned_depairport_lon, planned_destairport_lat, planned_destairport_lon, atis_message, time_last_atis_received, time_logon, heading, QNH_iHg, QNH_Mb);
        this.callsign = callsign;
        this.cid = cid;
        this.realname = realname;
        this.clienttype = clienttype;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.groundspeed = groundspeed;
        this.planned_aircraft = planned_aircraft;
        this.planned_tascruise = planned_tascruise;
        this.planned_depairport = planned_depairport;
        this.planned_altitude = planned_altitude;
        this.planned_destairport = planned_destairport;
        this.server = server;
        this.protrevision = protrevision;
        this.rating = rating;
        this.transponder = transponder;
        this.planned_revision = planned_revision;
        this.planned_flighttype = planned_flighttype;
        this.planned_deptime = planned_deptime;
        this.planned_actdeptime = planned_actdeptime;
        this.planned_hrsenroute = planned_hrsenroute;
        this.planned_minenroute = planned_minenroute;
        this.planned_hrsfuel = planned_hrsfuel;
        this.planned_minfuel = planned_minfuel;
        this.planned_altairport = planned_altairport;
        this.planned_remarks = planned_remarks;
        this.planned_route = planned_route;
        this.planned_depairport_lat = planned_depairport_lat;
        this.planned_depairport_lon = planned_depairport_lon;
        this.planned_destairport_lat = planned_destairport_lat;
        this.planned_destairport_lon = planned_destairport_lon;
        this.atis_message = atis_message;
        this.time_last_atis_received = time_last_atis_received;
        this.time_logon = time_logon;
        this.heading = heading;
        this.QNH_iHg = QNH_iHg;
        this.QNH_Mb = QNH_Mb;
    }
    return Pilot;
}(client_1.Client));
exports.Pilot = Pilot;
