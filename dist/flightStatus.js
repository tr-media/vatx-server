"use strict";
(function (FlightStatus) {
    FlightStatus[FlightStatus["Unknown"] = 0] = "Unknown";
    FlightStatus[FlightStatus["Planned"] = 1] = "Planned";
    FlightStatus[FlightStatus["Boarding"] = 2] = "Boarding";
    FlightStatus[FlightStatus["Departing"] = 3] = "Departing";
    FlightStatus[FlightStatus["Airborne"] = 4] = "Airborne";
    FlightStatus[FlightStatus["Interrupted"] = 5] = "Interrupted";
    FlightStatus[FlightStatus["Approaching"] = 6] = "Approaching";
    FlightStatus[FlightStatus["Landing"] = 7] = "Landing";
    FlightStatus[FlightStatus["Landed"] = 8] = "Landed";
    FlightStatus[FlightStatus["Offline"] = 9] = "Offline";
})(exports.FlightStatus || (exports.FlightStatus = {}));
var FlightStatus = exports.FlightStatus;
