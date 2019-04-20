"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var client_1 = require("./client");
var flightStatus_1 = require("./flightStatus");
var Pilot = (function (_super) {
    __extends(Pilot, _super);
    function Pilot(data, streamDate) {
        return _super.call(this, data, streamDate) || this;
    }
    Pilot.prototype.calculateCustomFields = function (library) {
        this.no_voice = this.planned_remarks.indexOf('/v/') < 0 && this.planned_remarks.indexOf('/V/') < 0;
        if (this.planned_depairport !== '' && this.planned_depairport_lat == 0 && this.planned_depairport_lon == 0) {
            var depAirport = library.getAirport(this.planned_depairport.toLowerCase());
            if (depAirport) {
                this.planned_depairport_lat = depAirport.lat;
                this.planned_depairport_lon = depAirport.lon;
            }
        }
        if (this.planned_destairport !== '' && this.planned_destairport_lat == 0 && this.planned_destairport_lon == 0) {
            var destAirport = library.getAirport(this.planned_destairport.toLowerCase());
            if (destAirport) {
                this.planned_destairport_lat = destAirport.lat;
                this.planned_destairport_lon = destAirport.lon;
            }
        }
        if ((this.latitude == 0 && this.longitude == 0) || (this.planned_destairport_lat == 0 && this.planned_destairport_lon == 0)) {
            this.distance_to_destination = 99999;
        }
        else {
            this.distance_to_destination = library.greatCircleDistance(this.latitude, this.longitude, this.planned_destairport_lat, this.planned_destairport_lon);
        }
        if ((this.latitude == 0 && this.longitude == 0) || (this.planned_depairport_lat == 0 && this.planned_depairport_lon == 0)) {
            this.distance_from_departure = 99999;
        }
        else {
            this.distance_from_departure = library.greatCircleDistance(this.latitude, this.longitude, this.planned_depairport_lat, this.planned_depairport_lon);
        }
        if (this.distance_from_departure <= 5 && this.distance_from_departure < this.distance_to_destination) {
            if (this.groundspeed <= 0) {
                this.status = flightStatus_1.FlightStatus.Boarding;
            }
            else {
                this.status = flightStatus_1.FlightStatus.Departing;
            }
        }
        else if (this.distance_to_destination <= 5) {
            if (this.groundspeed <= 40) {
                this.status = flightStatus_1.FlightStatus.Landed;
            }
            else {
                this.status = flightStatus_1.FlightStatus.Landing;
            }
        }
        else if (this.distance_to_destination <= 25) {
            this.status = flightStatus_1.FlightStatus.Approaching;
        }
        else if (this.groundspeed == 0) {
            this.status = flightStatus_1.FlightStatus.Interrupted;
        }
        else {
            this.status = flightStatus_1.FlightStatus.Airborne;
        }
        if (this.distance_to_destination < 99999) {
            if (this.groundspeed > 20) {
                this.estimated_time_of_arrival = moment(this.last_update_from_stream).add(this.distance_to_destination / this.groundspeed, 'hours');
            }
            else if (this.planned_tascruise > 20) {
                this.estimated_time_of_arrival = moment(this.last_update_from_stream).add(this.distance_to_destination / this.planned_tascruise, 'hours');
            }
            else {
                this.estimated_time_of_arrival = moment.utc([2000, 0, 1]);
            }
        }
        else {
            this.estimated_time_of_arrival = moment.utc([2100, 0, 1]);
        }
        var m = this.realname.match(/^(.*?)[ \-_]+([A-Z][A-Z][A-Z][A-Z])$/);
        if (m) {
            this.realname = m[1];
            this.homebase = (m.length > 1) ? m[2] : '';
        }
        else {
            this.homebase = '';
        }
        switch (this.status) {
            case flightStatus_1.FlightStatus.Unknown:
                this.status_string = 'Unknown';
                break;
            case flightStatus_1.FlightStatus.Planned:
                this.status_string = 'Planned';
                break;
            case flightStatus_1.FlightStatus.Boarding:
                this.status_string = 'Boarding';
                break;
            case flightStatus_1.FlightStatus.Departing:
                this.status_string = 'Departing';
                break;
            case flightStatus_1.FlightStatus.Airborne:
                this.status_string = 'Airborne: ' + moment(this.estimated_time_of_arrival).utc().format('HH:mm');
                break;
            case flightStatus_1.FlightStatus.Interrupted:
                this.status_string = 'Interrupted';
                break;
            case flightStatus_1.FlightStatus.Approaching:
                this.status_string = 'Approaching';
                break;
            case flightStatus_1.FlightStatus.Landing:
                this.status_string = 'Landing';
                break;
            case flightStatus_1.FlightStatus.Landed:
                this.status_string = 'Landed';
                break;
            case flightStatus_1.FlightStatus.Offline:
                this.status_string = 'Offline';
                break;
        }
        this.sort_string = 'S' + (10 - this.status) + ':';
        if (this.status === flightStatus_1.FlightStatus.Airborne) {
            this.sort_string += this.estimated_time_of_arrival.unix();
        }
        else if (this.status == flightStatus_1.FlightStatus.Approaching ||
            this.status == flightStatus_1.FlightStatus.Landing ||
            this.status == flightStatus_1.FlightStatus.Departing ||
            this.status == flightStatus_1.FlightStatus.Interrupted ||
            this.status == flightStatus_1.FlightStatus.Boarding) {
            this.sort_string += this.distance_to_destination;
        }
    };
    Pilot.prototype.toJson = function () {
        return {
            callsign: this.callsign,
            cid: this.cid,
            realname: this.realname,
            latitude: this.latitude,
            longitude: this.longitude,
            altitude: this.altitude,
            groundspeed: this.groundspeed,
            planned_aircraft: this.planned_aircraft,
            planned_tascruise: this.planned_tascruise,
            planned_depairport: this.planned_depairport,
            planned_altitude: this.planned_altitude,
            planned_destairport: this.planned_destairport,
            server: this.server,
            protrevision: this.protrevision,
            rating: this.rating,
            transponder: this.transponder,
            planned_revision: this.planned_revision,
            planned_flighttype: this.planned_flighttype,
            planned_deptime: this.planned_deptime,
            planned_actdeptime: this.planned_actdeptime,
            planned_hrsenroute: this.planned_hrsenroute,
            planned_minenroute: this.planned_minenroute,
            planned_hrsfuel: this.planned_hrsfuel,
            planned_minfuel: this.planned_minfuel,
            planned_altairport: this.planned_altairport,
            planned_remarks: this.planned_remarks,
            planned_route: this.planned_route,
            planned_depairport_lat: this.planned_depairport_lat,
            planned_depairport_lon: this.planned_depairport_lon,
            planned_destairport_lat: this.planned_destairport_lat,
            planned_destairport_lon: this.planned_destairport_lon,
            atis_message: this.atis_message,
            time_last_atis_received: this.time_last_atis_received,
            time_logon: this.time_logon,
            heading: this.heading,
            QNH_iHg: this.QNH_iHg,
            QNH_Mb: this.QNH_Mb,
            no_voice: this.no_voice,
            distance_to_destination: this.distance_to_destination,
            distance_from_departure: this.distance_from_departure,
            status: this.status,
            status_string: this.status_string,
            estimated_time_of_arrival: this.estimated_time_of_arrival,
            last_update_from_stream: this.last_update_from_stream,
            homebase: this.homebase,
            sort_string: this.sort_string
        };
    };
    return Pilot;
}(client_1.Client));
exports.Pilot = Pilot;
