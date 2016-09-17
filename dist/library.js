"use strict";
var Library = (function () {
    function Library() {
        var _this = this;
        this.airports = {};
        this.airportSearchIndex = [];
        this.airlines = {};
        this.airlineSearchIndex = [];
        require('../data/airports.json').map(function (a) {
            _this.airports[a.id.toUpperCase()] = a;
        });
        for (var key in this.airports) {
            this.airportSearchIndex.push({ key: key, value: key });
        }
        for (var key in this.airports) {
            this.airportSearchIndex.push({ key: this.airports[key].name.toUpperCase(), value: key });
        }
        for (var key in this.airports) {
            this.airportSearchIndex.push({ key: this.airports[key].city.toUpperCase(), value: key });
        }
        require('../data/airlines.json').map(function (a) {
            _this.airlines[a.id.toUpperCase()] = a;
        });
        require('../data/airlines_va.json').map(function (a) {
            _this.airlines[a.id.toUpperCase()] = a;
        });
        for (var key in this.airlines) {
            this.airlineSearchIndex.push({ key: key, value: key });
        }
        for (var key in this.airlines) {
            this.airlineSearchIndex.push({ key: this.airlines[key].name.toUpperCase(), value: key });
        }
        for (var key in this.airlines) {
            this.airlineSearchIndex.push({ key: this.airlines[key].callsign.toUpperCase(), value: key });
        }
        console.log('Library loaded');
    }
    Library.prototype.getAirports = function (mode) {
        if (mode === void 0) { mode = ''; }
        return this.prepareData(this.airports, mode);
    };
    Library.prototype.getAirport = function (id) {
        id = id.toUpperCase();
        if (this.airports.hasOwnProperty(id)) {
            return this.airports[id];
        }
        return null;
    };
    Library.prototype.getAirlines = function (mode) {
        if (mode === void 0) { mode = ''; }
        return this.prepareData(this.airlines, mode);
    };
    Library.prototype.getAirline = function (id) {
        id = id.toUpperCase();
        if (this.airlines.hasOwnProperty(id)) {
            return this.airlines[id];
        }
        return null;
    };
    Library.prototype.find = function (q) {
        q = q.toUpperCase();
        return {
            airports: this.airportSearchIndex.filter(function (a) {
                return a.key.indexOf(q) === 0;
            }).map(function (a) {
                return a.value;
            }).slice(0, 20),
            airlines: this.airlineSearchIndex.filter(function (a) {
                return a.key.indexOf(q) === 0;
            }).map(function (a) {
                return a.value;
            }).slice(0, 20)
        };
    };
    Library.prototype.prepareData = function (dict, mode) {
        if (mode === 'list') {
            var result = [];
            for (var key in dict) {
                result.push(dict[key]);
            }
            return result;
        }
        else {
            return dict;
        }
    };
    Library.prototype.greatCircleDistance = function (loc1_lat, loc1_lon, loc2_lat, loc2_lon, precision, unit) {
        if (precision === void 0) { precision = 4; }
        if (unit === void 0) { unit = "nm"; }
        var lat1 = loc1_lat * Math.PI / 180;
        var lat2 = loc2_lat * Math.PI / 180;
        var lon1 = loc1_lon * Math.PI / 180;
        var lon2 = loc2_lon * Math.PI / 180;
        var theta = lon1 - lon2;
        var rawdistance = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(theta);
        if (unit == "km") {
            var distance = Math.round(6371.000785 * Math.acos(rawdistance));
            return distance;
        }
        if (unit == "m") {
            var distance = Math.round(6371000.785 * Math.acos(rawdistance));
            return distance;
        }
        if (unit == "nm") {
            var distance = Math.round(3440.04664 * Math.acos(rawdistance));
            return distance;
        }
        if (unit == "ft") {
            var distance = Math.round(20902233.54659 * Math.acos(rawdistance));
            return distance;
        }
        return 0;
    };
    return Library;
}());
exports.Library = Library;
