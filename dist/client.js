"use strict";
var moment = require('moment');
var fieldNames = 'callsign:cid:realname:clienttype:frequency:latitude:longitude:altitude:groundspeed:planned_aircraft:planned_tascruise:planned_depairport:planned_altitude:planned_destairport:server:protrevision:rating:transponder:facilitytype:visualrange:planned_revision:planned_flighttype:planned_deptime:planned_actdeptime:planned_hrsenroute:planned_minenroute:planned_hrsfuel:planned_minfuel:planned_altairport:planned_remarks:planned_route:planned_depairport_lat:planned_depairport_lon:planned_destairport_lat:planned_destairport_lon:atis_message:time_last_atis_received:time_logon:heading:QNH_iHg:QNH_Mb:'.split(':');
var Client = (function () {
    function Client(fields) {
        this.callsign = '';
        this.cid = '';
        this.realname = '';
        this.clienttype = '';
        this.frequency = '';
        this.latitude = 0;
        this.longitude = 0;
        this.altitude = 0;
        this.groundspeed = 0;
        this.planned_aircraft = '';
        this.planned_tascruise = 0;
        this.planned_depairport = '';
        this.planned_altitude = '';
        this.planned_destairport = '';
        this.server = '';
        this.protrevision = 0;
        this.rating = 0;
        this.transponder = '';
        this.facilitytype = 0;
        this.visualrange = 0;
        this.planned_revision = '';
        this.planned_flighttype = '';
        this.planned_deptime = '';
        this.planned_actdeptime = '';
        this.planned_hrsenroute = '';
        this.planned_minenroute = '';
        this.planned_hrsfuel = '';
        this.planned_minfuel = '';
        this.planned_altairport = '';
        this.planned_remarks = '';
        this.planned_route = '';
        this.planned_depairport_lat = 0;
        this.planned_depairport_lon = 0;
        this.planned_destairport_lat = 0;
        this.planned_destairport_lon = 0;
        this.atis_message = '';
        this.time_last_atis_received = moment.utc([2000, 0, 1]);
        this.time_logon = moment.utc([2000, 0, 1]);
        this.heading = 0;
        this.QNH_iHg = 0.0;
        this.QNH_Mb = 0.0;
        if (fields.length == fieldNames.length) {
            var data = {};
            for (var i = 0; i < fieldNames.length; i++) {
                if (this.hasOwnProperty(fieldNames[i])) {
                    if (this[fieldNames[i]] instanceof moment) {
                        var tmp = moment(fields[i]);
                        if (tmp.isValid()) {
                            this[fieldNames[i]] = tmp;
                        }
                    }
                    if (typeof this[fieldNames[i]] === 'number') {
                        var tmp = parseFloat(fields[i]);
                        if (!isNaN(tmp)) {
                            this[fieldNames[i]] = tmp;
                        }
                    }
                    if (typeof this[fieldNames[i]] === 'string') {
                        if (fields[i] != null) {
                            this[fieldNames[i]] = fields[i];
                        }
                    }
                }
                data[fieldNames[i]] = fields[i];
            }
        }
        else {
            throw 'Invalid number of fields';
        }
    }
    return Client;
}());
exports.Client = Client;
